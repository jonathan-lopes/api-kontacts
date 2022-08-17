const knex = require("../database/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginSchema = require("../validations/loginSchema");

const login = async (req, res) => {
  const { email, passwd } = req.body;

  try {
    await loginSchema.validate({ email, passwd });
    
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ message: "O usuário não foi encontrado" });
    }

    const pwdBcrypt = await bcrypt.compare(passwd, user.passwd);

    if (!pwdBcrypt) {
      return res.status(401).json({ message: "Email e senha não confere" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    return res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    return res
      .status(error.name === "ValidationError" ? 400 : 500)
      .json({ message: error.message });
  }
};

module.exports = login;
