const { Router } = require("express");
const login = require("../controllers/login");
const register = require("../controllers/user");
const verifyLogin = require("../middleware/verifyLogin");
const contactsController = require("../controllers/contacts");

const routes = Router();

routes.post("/login", login);
routes.post("/usuarios", register);

routes.use(verifyLogin);

routes.get("/contatos", contactsController.getAllContacts);
routes.get("/contatos/:id", contactsController.getContact);
routes.post("/contatos", contactsController.createContact);
routes.delete("/contatos/:id", contactsController.deleteContact);
routes.put("/contatos/:id", contactsController.editContact);

module.exports = routes;
