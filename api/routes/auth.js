const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const id = req.headers.user_id;

  if (req.decodedJwt) {
    next();
  } else if (token && id) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ message: "Failed to verify authorization" });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Failed to verify authorization or user_id" });
  }
};
