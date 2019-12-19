const router = require("express").Router();
const userRouter = require("./routes/users/userRouter.js");

router.use("/users", userRouter);

router.get("/", (req, res) => {
  res.send("Somebody call for an exterminator?");
});

module.exports = router;
