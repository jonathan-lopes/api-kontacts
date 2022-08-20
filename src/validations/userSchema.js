const yup = require("./yupSettings");

const userSchema = yup.object().shape({
  name: yup.string().trim().required("Nome é um campo obrigatório"),
  email: yup.string().email("Formato de e-mail inválido").required(),
  passwd: yup.string().strict().min(8, "Senha deve ter pelo menos 8 caracteres").required("Senha é um campo obrigatório"),
});

module.exports = userSchema;
