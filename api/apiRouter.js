const router = require("express").Router();
const userRouter = require("./routes/users/userRouter.js");
const restaurantRouter = require("./routes/restaurants/restaurantRouter.js");

router.use("/users", userRouter);
router.use("/restaurants", restaurantRouter);

router.get("/", (req, res) => {
  res.send("Somebody call for an exterminator?");
});

module.exports = router;
