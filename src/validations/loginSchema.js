const yup = require("./yupSettings");

const loginSchema = yup.object().shape({
  email: yup.string().email("Formato de e-mail inválido").required(),
  passwd: yup.string().strict().min(8).required(),
});

module.exports = loginSchema;
