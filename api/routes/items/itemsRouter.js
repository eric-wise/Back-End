const db = require("./itemsModel.js");
const userDb = require("../users/userModel.js");
const authMiddleware = require("../auth.js");
const restDb = require("../restaurants/restaurantModel.js");

const router = require("express").Router();
router.use(authMiddleware);

router.get("/:id", validateUserId, validateId, (req, res) => {
  const id = req.params.id;
  const user_id = req.headers.user_id;

  db.getById(id, user_id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving item" });
    });
});

router.post(
  "/",
  validateBody,
  validateItemKeys,
  validateUserId,
  validateRestaurantId,
  (req, res) => {
    const info = req.body;

    db.addReview(info)
      .then(rev => {
        res.status(201).json(rev[0]);
      })
      .catch(err => {
        res.status(500).json({ message: "Error adding item" });
      });
  }
);

router.put(
  "/:id",
  validateBody,
  validateItemKeys,
  validateUserId,
  validateRestaurantId,
  (req, res) => {
    const id = req.params.id;
    const info = req.body;
    const user_id = req.headers.user_id;

    db.updateReview(id, info, user_id)
      .then(item => {
        res.status(200).json(item[0]);
      })
      .catch(err => {
        res.status(500).json({ message: "Error updating item" });
      });
  }
);

router.delete("/:id", validateId, (req, res) => {
  const id = req.params.id;
  const user_id = req.headers.user_id;

  db.deleteReview(id, user_id)
    .then(item => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting item" });
    });
});

/////////////////////////////////////////////////////////////////

function validateId(req, res, next) {
  const id = req.params.id;
  const user_id = req.headers.user_id;

  db.getById(id, user_id)
    .then(item => {
      item
        ? next()
        : res.status(404).json({ message: "Can't find item with that ID" });
    })
    .catch(err => {
      res.status(500).json({ message: "Error validating ID" });
    });
}

function validateUserId(req, res, next) {
  const id = req.body.user_id;
  userDb.findBy({ id }).then(user => {
    user ? next() : res.status(404).json({ message: "Invalid user ID" });
  });
}

function validateBody(req, res, next) {
  Object.entries(req.body).length > 0
    ? next()
    : res.status(400).json({ message: "Request is missing body" });
}

function validateItemKeys(req, res, next) {
  const { restaurant_id, cuisine, name, rating, review, user_id } = req.body;

  restaurant_id && typeof restaurant_id == "number"
    ? cuisine && typeof cuisine == "string"
      ? name && typeof name == "string"
        ? rating && typeof rating == "number"
          ? review && typeof review == "string"
            ? user_id && typeof user_id == "number"
              ? next()
              : res.status(400).json({
                  message:
                    "Request body is missing key of user_id or user_id is NaN"
                })
            : res.status(400).json({
                message:
                  "Request body is missing key of review or review is not a string"
              })
          : res.status(400).json({
              message: "Request body is missing key of rating or rating is NaN"
            })
        : res.status(400).json({
            message:
              "Request body is missing key of name or name is not a string"
          })
      : res.status(400).json({
          message:
            "Request body is missing key of cuisine or cuisine is not a string"
        })
    : res.status(400).json({
        message:
          "Request body is missing key of restaurant_id or restaurant_id is NaN"
      });
}

function validateRestaurantId(req, res, next) {
  const id = req.body.restaurant_id;
  restDb.findById(id).then(rest => {
    rest
      ? next()
      : res.status(404).json({ message: "Can't find restaurant with that ID" });
  });
}

module.exports = router;
