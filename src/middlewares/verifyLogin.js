const jwt = require("jsonwebtoken");
const knex = require("../database");
const { UnauthorizedError, NotFoundError } = require("../helpers/apiErrors");

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado");
  }

  const token = authorization.replace("Bearer ", "").trim();

  const { id } = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        throw new UnauthorizedError("Token malformado");
      } else if (err.name === "TokenExpiredError") {
        throw new UnauthorizedError("Token expirou");
      }
    }

    return decoded;
  });

  const existingUser = await knex("users").where({ id }).first();

  if (!existingUser) {
    throw new NotFoundError("Usuario não encontrado");
  }

  const { passwd, ...user } = existingUser;

  req.user = user;

  next();
};

module.exports = verifyLogin;
