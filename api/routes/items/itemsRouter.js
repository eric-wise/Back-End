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

  restaurant_id
    ? cuisine
      ? name
        ? rating
          ? review
            ? next()
            : res
                .status(400)
                .json({ message: "Request body is missing key of user_id" })
          : res
              .status(400)
              .json({ message: "Request body is missing key of rating" })
        : res
            .status(400)
            .json({ message: "Request body is missing key of name" })
      : res
          .status(400)
          .json({ message: "Request body is missing key of cuisine" })
    : res
        .status(400)
        .json({ message: "Request body is missing key of restaurant_id" });
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
