require("dotenv").config({});

const {
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
} = process.env;

module.exports = {
  test: {
    client: "mysql2",
    connection: {
      host: DATABASE_HOST,
      database: DATABASE_NAME,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
    },
  },

  development: {
    client: "mysql2",
    connection: {
      host: DATABASE_HOST,
      database: DATABASE_NAME,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
    },
    pool: {
      min: 5,
      max: 10,
    },
  },
};
