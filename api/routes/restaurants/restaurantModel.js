const db = require("../../../data/dbConfig.js");

function addRest(rest) {
  return db("restaurants")
    .returning(["id", ...Object.keys(rest)])
    .insert(rest);
}

async function getRest(id, user_id) {
  const restaurant = await db("restaurants")
    .where("id", id)
    .andWhere("user_id", user_id)
    .first();

  const reviews = await db("items").where("restaurant_id", id);

  const list = await reviews.map(cv => {
    return cv.rating;
  });

  var rating;

  if (list.length > 0) {
    rating = await (list.reduce((total, amount) => total + amount) /
      list.length);
  }

  return {
    ...restaurant,
    reviews: reviews,
    rating: rating || "N/A"
  };
}

function findById(key) {
  return db("restaurants")
    .where("id", key)
    .first();
}

function findByName(key) {
  return db("restaurants")
    .where("name", key)
    .first();
}

function getAll(user_name) {
  return db("restaurants").where("user_id", user_id);
}

function updateRest(id, obj, user_id) {
  return db("restaurants")
    .where("id", id)
    .andWhere("user_id", user_id)
    .update(obj)
    .returning(["id", ...Object.keys(obj)]);
}

function delRest(id, user_id) {
  return db("restaurants")
    .where("id", id)
    .andWhere("user_id", user_id)
    .del();
}

module.exports = {
  addRest,
  findById,
  getRest,
  getAll,
  updateRest,
  delRest,
  findByName
};
