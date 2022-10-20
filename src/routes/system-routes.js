/* eslint-disable global-require */
const express = require("express");
const knex = require("../services/knex");
const apiCallback = require("../middlewares/api-callback-middleware");

const router = express.Router();

const migrationUp = async () => {
  try {
    await knex.migrate.up();
    await knex.migrate.latest();
    return { statusCode: 201, data: "migrations up!" };
  } catch (error) {
    console.error("Migration errors: ", error);
    return { statusCode: 400, data: "migrations failed!" };
  }
};

router.post("/migrations", apiCallback(migrationUp));

module.exports = router;
