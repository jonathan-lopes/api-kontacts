const yup = require("./yupSettings");

const userSchema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().email("Formato de e-mail inválido").required(),
  passwd: yup.string().strict().min(8).required(),
});

module.exports = userSchema;
