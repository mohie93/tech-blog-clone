const { v4: uuid } = require("uuid");
const knex = require("../services/knex");

const tableName = "categories";

class Category {
  constructor(payload) {
    this.categoryId = uuid();
    this.name = payload.name;
    this.description = payload.description;
    this.activated = payload.activated;
  }

  async create() {
    const { categoryId, name, description, activated } = this;
    return knex(tableName).insert({ categoryId, name, description, activated });
  }

  static async update(categoryId, payload) {
    return knex(tableName).where({ categoryId }).update(payload);
  }

  static async destroy(categoryId) {
    return knex(tableName).where({ categoryId }).del();
  }

  static async getById(categoryId) {
    return knex(tableName).where({ categoryId }).select("*").first();
  }

  static async getBy(options) {
    return knex(tableName).where(options).select("*");
  }

  static async getAll() {
    return knex(tableName).select("*");
  }
}

module.exports = Category;
