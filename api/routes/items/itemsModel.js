const db = require("../../../data/dbConfig.js");

function getAll(user_id) {
  return db("items").where("user_id", user_id);
}

function getById(id, user_id) {
  return db("items")
    .where("user_id", user_id)
    .andWhere("id", id)
    .first();
}

function getByRestaurant(id, user_id) {
  return db("items")
    .where("restaurant_id", id)
    .andWhere("user_id", user_id);
}

function addReview(info) {
  return db("items")
    .returning(["id", ...Object.keys(info)])
    .insert(info);
}

function updateReview(id, info, user_id) {
  return db("items")
    .where("id", id)
    .andWhere("user_id", user_id)
    .update(info)
    .returning(["id", ...Object.keys(info)]);
}

function deleteReview(id, user_id) {
  return db("items")
    .where("id", id)
    .andWhere("user_id", user_id)
    .del();
}

module.exports = {
  getAll,
  getById,
  getByRestaurant,
  addReview,
  updateReview,
  deleteReview
};
