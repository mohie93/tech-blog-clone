require("dotenv").config({});

const { v4: uuid } = require("uuid");
const crypto = require("crypto");

const encrypt = async (password) => {
  // Hashing user's salt and password with 1000 iterations,64 length and sha512 digest
  const salt = process.env.PASSWORD_SALT;

  // Reduce iterations on test to speed up test and reduce blocking
  const iterations = process.env.NODE_ENV !== "test" ? 1000 : 1;

  return crypto.pbkdf2Sync(password, salt, iterations, 30, `sha512`).toString(`hex`);
};

const knex = require("../services/knex");

const tableName = "users";

class User {
  constructor(payload) {
    this.userId = uuid();
    this.fullName = payload.fullName;
    this.userName = payload.userName;
    this.password = payload.password;
    this.email = payload.email;
    this.type = payload.type || "user";
    this.membership = payload.membership || "normal";
  }

  async create() {
    const { userId, userName, password, email, fullName, type, membership } = this;

    const encryptedPassword = await encrypt(password);

    return await knex(tableName).insert({
      userId,
      userName,
      password: encryptedPassword,
      email,
      fullName,
      type,
      membership
    });
  }

  static async update(userId, payload) {
    return knex(tableName).where({ userId }).update(payload);
  }

  static async destroy(userId) {
    return knex(tableName).where({ userId }).del();
  }

  static async getById(userId) {
    return knex(tableName).where({ userId }).select("*").first();
  }

  static async getBy(options) {
    return knex(tableName).where(options).select("*").first();
  }

  static async getAll() {
    return knex(tableName).select("*");
  }

  static async login(userName, password) {
    const encryptedPassword = await encrypt(password);

    return await knex(tableName).where({ userName, password: encryptedPassword }).select("*").first();
  }
}

module.exports = User;
