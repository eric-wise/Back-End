const db = require("./userModel.js");
const bcjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post("/register", authBody, authRegKeys, (req, res) => {
  const creds = req.body;

  const hash = bcjs.hashSync(creds.password, 8);
  creds.password = hash;

  db.addUser(creds)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error adding a new user to the database" });
    });
});

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
  username
    ? password
      ? location
        ? email
          ? next()
          : res.status(400).json({ message: "Request body is missing email" })
        : res.status(400).json({ message: "Request body is missing location" })
      : res.status(400).json({ message: "Request body is missing password" })
    : res.status(400).json({ message: "Request body is missing username" });
}

function authLoginKeys(req, res, next) {
  const { username, password } = req.body;
  username
    ? password
      ? next()
      : res.status(400).json({ message: "Request body is missing password" })
    : res.status(400).json({ message: "Request body is missing username" });
}

module.exports = router;
