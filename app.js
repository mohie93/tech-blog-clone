const serverless = require("serverless-http");
const express = require("express");

const app = express();
const cors = require("cors");

// handle json requests
app.use(express.json({ limit: "10mb" }));

// handle cross origins calls
app.use(cors());

// healthcheck to describe serverless app status
app.get("/healthcheck", async (_, res) => {
  res.status(200).json({ message: "OK" });
});

// to handle local development requests
exports.app = app;
module.exports.handler = serverless(app);
