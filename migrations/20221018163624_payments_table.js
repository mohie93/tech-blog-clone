/* eslint-disable consistent-return */
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.hasTable("payments").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("payments", (table) => {
        table.uuid("paymentId").primary();
        table.string("amount").notNullable();
        table.string("PaymentMethod").notNullable();
        table.string("status").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("payments");
};
