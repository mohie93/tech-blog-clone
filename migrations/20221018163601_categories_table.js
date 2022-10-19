/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.hasTable("categories").then((exists) => {
    if (!exists) {
      knex.schema.createTable("categories", (table) => {
        table.uuid("categoryId").primary();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.boolean("activated").defaultTo(true).notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
