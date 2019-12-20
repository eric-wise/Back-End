const db = require("./restaurantModel.js");
const userDb = require("../users/userModel.js");
const authMiddleware = require("../auth.js");

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

router.post("/", validateBody, validateRestKeys, validateUserId, (req, res) => {
  const creds = req.body;

  db.addRest(creds)
    .then(rest => {
      res.status(201).json(rest);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding restaurant to database" });
    });
});

router.put(
  "/:id",
  validateId,
  validateBody,
  validateRestKeys,
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

///////////////////////////////////////////////////////

function validateId(req, res, next) {
  const id = req.params.id;

  db.findById(id).then(rest => {
    rest
      ? next()
      : res.status(404).json({ message: "Can't find restaurant with that ID" });
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

  name
    ? cuisine
      ? location
        ? hour_open
          ? hour_closed
            ? days_open
              ? user_id
                ? next()
                : res
                    .status(400)
                    .json({ message: "Request body is missing user_id" })
              : res
                  .status(400)
                  .json({ message: "Request body is missing days_open" })
            : res
                .status(400)
                .json({ message: "Request body is missing hour_closed" })
          : res
              .status(400)
              .json({ message: "Request body is missing hour_open" })
        : res.status(400).json({ message: "Request body is missing location" })
      : res.status(400).json({ message: "Request body is missing cuisine" })
    : res.status(400).json({ message: "Request body is missing name" });
}

function validateUserId(req, res, next) {
  const id = req.body.user_id;
  userDb.findBy({ id }).then(user => {
    user ? next() : res.status(404).json({ message: "Invalid user ID" });
  });
}

module.exports = router;
