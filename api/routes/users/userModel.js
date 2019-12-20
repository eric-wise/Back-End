const db = require("../../../data/dbConfig.js");

function addUser(user) {
  return db("users")
    .returning(["id", "username", "location", "email"])
    .insert(user);
}

function findBy(key) {
  return db("users")
    .where(key)
    .first();
}

module.exports = {
  addUser,
  findBy
};
