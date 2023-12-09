/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable("Game", (table) => {
    table.increments("id").primary();
    table.integer("userid");
    table.string("title");
    table.json("position");
    table.json("map");
    table.json("stats");
    table.json("inventory");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Game");
};
