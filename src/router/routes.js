const { Router } = require("express");
const login = require("../controllers/login");
const register = require("../controllers/user");

const routes = Router();

routes.post("/login", login);
routes.post("/usuarios", register);

module.exports = routes;
