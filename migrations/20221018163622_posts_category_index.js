/* eslint-disable consistent-return */
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.hasTable("posts").then((exists) => {
    if (exists) {
      return knex.schema.table("posts", (table) => {
        table.foreign("categoryId").references("categoryId").inTable("categories");
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.table("posts", (table) => {
    table.dropForeign("categoryId");
  });
};
