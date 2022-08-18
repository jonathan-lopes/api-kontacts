const knex = require("../database");
const userSchema = require("../validations/userSchema");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, passwd } = req.body;

  try {
    await userSchema.validate({ name, email, passwd });

    const userEmail = await knex("users").where({ email }).first();

    if (userEmail) {
      return res.status(403).json({ message: "E-mail já cadastrado" });
    }

    const pwdCrypt = await bcrypt.hash(passwd, Number(process.env.SALT_ROUNDS));

    const insertUser = await knex("users").insert({
      name,
      email,
      passwd: pwdCrypt,
    });

    if (insertUser === 0) {
      return res
        .status(500)
        .json({ message: "Não foi possível cadastrar o usuário" });
    }

    return res.status(201).json();
  } catch (error) {
    return res
      .status(error.name === "ValidationError" ? 400 : 500)
      .json({ message: error.message });
  }
};

module.exports = register;
