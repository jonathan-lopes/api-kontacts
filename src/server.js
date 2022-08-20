require("dotenv").config();
const express = require("express");
const router = require("./router/routes");
const cors = require("cors");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(router);

module.exports = app;
