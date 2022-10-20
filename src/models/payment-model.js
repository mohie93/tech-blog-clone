const knex = require("../services/knex");

const tableName = "payments";
class Payment {
  constructor(payload) {
    this.paymentId = payload.paymentId;
    this.paymentMethod = payload.paymentMethod;
    this.amount = payload.amount;
    this.status = payload.status;
  }

  async create() {
    const { paymentMethod, status, amount } = this;
    return knex(tableName).insert({ paymentMethod, status, amount });
  }

  static async update(paymentId, payload) {
    return knex(tableName).where({ paymentId }).update(payload);
  }

  static async destroy(paymentId) {
    return knex(tableName).where({ paymentId }).del();
  }

  static async getById(paymentId) {
    return knex(tableName).where({ paymentId }).select("*").first();
  }

  static async getBy(options) {
    return knex(tableName).where(options).select("*");
  }

  static async getAll() {
    return knex(tableName).select("*");
  }
}

module.exports = Payment;
