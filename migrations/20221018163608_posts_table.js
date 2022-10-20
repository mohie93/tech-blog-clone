/* eslint-disable consistent-return */
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.hasTable("posts").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("posts", (table) => {
        table.uuid("postId").primary();
        table.string("title").notNullable();
        table.string("categoryId").notNullable();
        table.longText("body").notNullable();
        table.string("status").notNullable();
        table.string("label").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
