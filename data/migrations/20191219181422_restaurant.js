exports.up = function(knex) {
  return knex.schema
    .createTable("restaurants", tbl => {
      tbl.increments();
      tbl.text("name", 128).notNullable();
      tbl.text("cuisine", 128).notNullable();
      tbl.text("location", 128).notNullable();
      tbl
        .integer("hour_open")
        .notNullable()
        .unsigned();
      tbl
        .integer("hour_closed")
        .notNullable()
        .unsigned();
      tbl.text("days_open", 128).notNullable();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("photo_url");
    })
    .createTable("items", tbl => {
      tbl.increments();
      tbl
        .integer("restaurant_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("restaurants")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("cuisine").notNullable();
      tbl.text("name").notNullable();
      tbl.text("photo_url");
      tbl
        .integer("rating")
        .notNullable()
        .unsigned();
      tbl.string("review").notNullable();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("items")
    .dropTableIfExists("restaurants");
};
