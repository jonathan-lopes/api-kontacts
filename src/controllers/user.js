const knex = require("../database");
const userSchema = require("../validations/userSchema");
const bcrypt = require("bcrypt");
const { ForbiddenError, CrudError } = require("../helpers/apiErrors");

const register = async (req, res) => {
  const { name, email, passwd } = req.body;

  await userSchema.validate({ name, email, passwd });

  const userEmail = await knex("users").where({ email }).first();

  if (userEmail) {
    throw new ForbiddenError("E-mail já cadastrado");
  }

  const pwdCrypt = await bcrypt.hash(passwd, Number(process.env.SALT_ROUNDS));

  const insertUser = await knex("users").insert({
    name,
    email,
    passwd: pwdCrypt,
  });

  if (!insertUser) {
    throw new CrudError("Não foi possível cadastrar o usuário");
  }

  return res.status(201).json();
};

module.exports = register;
