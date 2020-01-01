const db = require("./userModel.js");
const bcjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post(
  "/register",
  authBody,
  authRegKeys,
  dupeUsernameCheck,
  (req, res) => {
    const creds = req.body;

    const hash = bcjs.hashSync(creds.password, 8);
    creds.password = hash;

    db.addUser(creds)
      .then(user => {
        res.status(201).json(user[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error adding a new user to the database" });
      });
  }
);

router.post("/login", authBody, authLoginKeys, (req, res) => {
  const { username, password } = req.body;
  db.findBy({ username })
    .then(user => {
      if (user && bcjs.compareSync(password, user.password)) {
        let token = generateToken(user);
        res.status(200).json({
          id: user.id,
          username: username,
          location: user.location,
          email: user.email,
          token: token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error logging in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

////////////////////////////////////////////////////////////////////////

function authBody(req, res, next) {
  Object.entries(req.body).length > 0
    ? next()
    : res.status(400).json({ message: "Request is missing body" });
}

function authRegKeys(req, res, next) {
  const { username, password, location, email } = req.body;
  username && typeof username == "string"
    ? password && typeof password == "string"
      ? location && typeof location == "string"
        ? email && typeof email == "string"
          ? next()
          : res.status(400).json({
              message: "Request body is missing email or email is not a string"
            })
        : res.status(400).json({
            message:
              "Request body is missing location or location is not a string"
          })
      : res.status(400).json({
          message:
            "Request body is missing password or password is not a string"
        })
    : res.status(400).json({
        message: "Request body is missing username or username is not a string"
      });
}

function authLoginKeys(req, res, next) {
  const { username, password } = req.body;
  username && typeof username == "string"
    ? password && typeof password == "string"
      ? next()
      : res.status(400).json({
          message:
            "Request body is missing password or password is not a string"
        })
    : res.status(400).json({
        message: "Request body is missing username or username is not a string"
      });
}

function dupeUsernameCheck(req, res, next) {
  const { username } = req.body;
  db.findBy({ username })
    .then(user => {
      if (user) {
        res.status(409).json({ message: "Username already in use" });
      } else {
        next();
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error checking for duplicate username" });
    });
}

module.exports = router;
