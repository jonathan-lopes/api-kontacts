const jwt = require("jsonwebtoken");
const knex = require("../database");

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await knex("users").where({ id }).first();

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const { passwd, ...user } = existingUser;

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Assinatura inválida" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirou" });
    }

    return res.status(500).json({ message: error.message });
  }
};

module.exports = verifyLogin;
