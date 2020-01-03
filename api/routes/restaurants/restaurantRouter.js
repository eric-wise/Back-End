const db = require("./restaurantModel.js");
const userDb = require("../users/userModel.js");
const authMiddleware = require("../auth.js");
const itemDb = require("../items/itemsModel");

const router = require("express").Router();
router.use(authMiddleware);

router.get("/", (req, res) => {
  const user_id = req.headers.user_id;

  db.getAll(user_id)
    .then(rest => {
      res.status(200).json(rest);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving restaurants" });
    });
});

router.get("/:id", validateId, (req, res) => {
  const id = req.params.id;
  const user_id = req.headers.user_id;

  db.getRest(id, user_id)
    .then(rest => {
      rest
        ? res.status(200).json(rest)
        : res
            .status(404)
            .json({ message: "Can't find restaurant with that ID" });
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving restaurant" });
    });
});

router.post(
  "/",
  validateBody,
  validateRestKeys,
  dupeNameCheck,
  militaryTime,
  validateUserId,
  (req, res) => {
    const creds = req.body;

    db.addRest(creds)
      .then(rest => {
        res.status(201).json(rest);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error adding restaurant to database" });
      });
  }
);

router.put(
  "/:id",
  validateId,
  validateBody,
  validateRestKeys,
  militaryTime,
  validateUserId,
  (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const user_id = req.headers.user_id;

    db.updateRest(id, changes, user_id)
      .then(rest => {
        res.status(200).json(rest[0]);
      })
      .catch(err => {
        res.status(500).json({ message: "Error updating restaurant" });
      });
  }
);

router.delete("/:id", validateId, (req, res) => {
  const id = req.params.id;
  const user_id = req.headers.user_id;

  db.delRest(id, user_id)
    .then(rest => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting restaurant" });
    });
});

router.get("/:id/items", validateId, validateUserId, (req, res) => {
  const id = req.params.id;
  const user_id = req.headers.user_id;

  itemDb
    .getByRestaurant(id, user_id)
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving items" });
    });
});

///////////////////////////////////////////////////////

function validateId(req, res, next) {
  const id = req.params.id;

  db.findById(id).then(rest => {
    rest
      ? next()
      : res.status(404).json({ message: "Can't find restaurant with that ID" });
  });
}

function dupeNameCheck(req, res, next) {
  const name = req.body.name;

  db.findByName(name).then(rest => {
    rest
      ? res
          .status(409)
          .json({ message: "Restaurant with that name already exists" })
      : next();
  });
}

function validateBody(req, res, next) {
  Object.entries(req.body).length > 0
    ? next()
    : res.status(400).json({ message: "Request is missing body" });
}

function validateRestKeys(req, res, next) {
  const {
    name,
    cuisine,
    location,
    hour_open,
    hour_closed,
    days_open,
    user_id
  } = req.body;

  name && typeof name == "string"
    ? cuisine && typeof cuisine == "string"
      ? location && typeof location == "string"
        ? hour_open && typeof hour_open == "number"
          ? hour_closed && typeof hour_closed == "number"
            ? days_open && typeof days_open == "string"
              ? user_id && typeof user_id == "number"
                ? next()
                : res.status(400).json({
                    message: "Request body is missing user_id or user_id is NaN"
                  })
              : res.status(400).json({
                  message:
                    "Request body is missing days_open or days_open is not a string"
                })
            : res.status(400).json({
                message:
                  "Request body is missing hour_closed or hour_closed is NaN"
              })
          : res.status(400).json({
              message: "Request body is missing hour_open or hour_open is NaN"
            })
        : res.status(400).json({
            message:
              "Request body is missing location or location is not a string"
          })
      : res.status(400).json({
          message: "Request body is missing cuisine or cuisine is not a string"
        })
    : res.status(400).json({
        message: "Request body is missing name or name is not a string"
      });
}

function validateUserId(req, res, next) {
  const id = req.body.user_id;
  const user_id = req.headers.user_id;

  id != user_id
    ? res.status(400).json({
        message: "Body key of user_id and header of user_id do not match"
      })
    : userDb.findBy({ id }).then(user => {
        user ? next() : res.status(404).json({ message: "Invalid user ID" });
      });
}

function militaryTime(req, res, next) {
  const { hour_open, hour_closed } = req.body;

  hour_open.toString().charAt(0) == 0
    ? res
        .status(400)
        .json({ message: "Does not accept numbers beginning with 0" })
    : hour_closed.toString().charAt(0) == 0
    ? res
        .status(400)
        .json({ message: "Does not accept numbers beginning with 0" })
    : next();
}

module.exports = router;
