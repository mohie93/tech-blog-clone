const { v4: uuid } = require("uuid");

const knex = require("../services/knex");

const tableName = "posts";
class Posts {
  constructor(payload) {
    this.postId = uuid();
    this.title = payload.title;
    this.categoryId = payload.categoryId;
    this.body = payload.body;
    this.status = payload.status;
    this.label = payload.label;
  }

  async create() {
    const { postId, title, categoryId, body, status, label } = this;
    return knex(tableName).insert({
      postId,
      title,
      categoryId,
      body,
      status,
      label
    });
  }

  static async update(postId, payload) {
    return knex(tableName).where({ postId }).update(payload);
  }

  static async destroy(postId) {
    return knex(tableName).where({ postId }).del();
  }

  static async getById(postId) {
    return knex(tableName).where({ postId }).select("*").first();
  }

  static async getBy(options) {
    return knex(tableName).where(options).select("*");
  }

  static async getAll() {
    return knex(tableName).select("*");
  }
}

module.exports = Posts;
