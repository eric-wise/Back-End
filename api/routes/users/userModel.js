const db = require("../../../data/dbConfig.js");

function addUser(user) {
  return db("users")
    .insert(user)
    .returning(["id", "username", "password", "location", "email"]);
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
