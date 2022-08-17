const { Router } = require("express");
const login = require("../controllers/login");

const routes = Router();

routes.post("/login", login);

module.exports = routes;
