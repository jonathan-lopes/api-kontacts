require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
require("express-async-errors");
const express = require("express");
const router = require("./router/routes");
const cors = require("cors");
const ErrorMiddleware = require("./middlewares/error");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(router);
app.use(ErrorMiddleware);

module.exports = app;
