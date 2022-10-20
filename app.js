const serverless = require("serverless-http");
const express = require("express");

const app = express();
const cors = require("cors");

// handle json requests
app.use(express.json());

// handle cross origins calls
app.use(cors());

// healthcheck to describe serverless app status
app.get("/healthcheck", async (_, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/users", require("./src/routes/user-routes"));
app.use("/api/posts", require("./src/routes/post-routes"));
app.use("/api/categories", require("./src/routes/category-routes"));
app.use("/api/system", require("./src/routes/system-routes"));

// to handle local development requests
exports.app = app;
module.exports.handler = serverless(app);
