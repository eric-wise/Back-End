const db = require("../../../data/dbConfig.js");

function addRest(rest) {
  return db("restaurants")
    .returning([
      "id",
      "name",
      "cuisine",
      "location",
      "hour_open",
      "hour_closed",
      "days_open",
      "user_id",
      "photo_url"
    ])
    .insert(rest);
}

async function getRest(value) {
  const restaurant = await db("restaurants")
    .where("id", value)
    .first();

  const reviews = await db
    .select("*")
    .from("items")
    .where("restaurant_id", value);

  const list = await reviews.map(cv => {
    return cv.rating;
  });

  const rating = await (list.reduce((total, amount) => total + amount) /
    list.length);

  return {
    ...restaurant,
    reviews: reviews,
    rating: rating
  };
}

function findById(key) {
  return db("restaurants")
    .where("id", key)
    .first();
}

function getAll() {
  return db("restaurants");
}

function updateRest(id, obj) {
  return db("restaurants")
    .where("id", id)
    .update(obj)
    .returning(Object.keys(obj));
}

function delRest(id) {
  return db("restaurants")
    .where("id", id)
    .del();
}

module.exports = {
  addRest,
  findById,
  getRest,
  getAll,
  updateRest,
  delRest
};
