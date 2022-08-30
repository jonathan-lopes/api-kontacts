const knex = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginSchema = require("../validations/loginSchema");
const { BadRequestError } = require("../helpers/apiErrors");

const login = async (req, res) => {
  const { email, passwd } = req.body;

  await loginSchema.validate({ email, passwd });

  const user = await knex("users").where({ email }).first();

  if (!user) {
    throw new BadRequestError("E-mail ou senha inválidos");
  }

  const pwdBcrypt = await bcrypt.compare(passwd, user.passwd);

  if (!pwdBcrypt) {
    throw new BadRequestError("E-mail ou senha inválidos");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  return res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
};

module.exports = login;
