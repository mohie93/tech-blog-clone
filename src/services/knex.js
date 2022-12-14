/* eslint-disable import/order */
require("dotenv").config({});

const knexConfig = require("../../knexfile");

const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

module.exports = knex;
