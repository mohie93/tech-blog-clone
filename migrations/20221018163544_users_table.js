/* eslint-disable consistent-return */
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.hasTable("users").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("users", (table) => {
        table.uuid("userId").primary();
        table.string("userName").notNullable();
        table.string("password").notNullable();
        table.string("fullName").notNullable();
        table.string("email").notNullable();
        table.string("membership").notNullable();
        table.string("type").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
