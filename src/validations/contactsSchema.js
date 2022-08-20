const yup = require("./yupSettings");

const contactsSchema = yup.object().shape({
  name: yup.string().trim().required("Nome é um campo obrigatório"),
  email: yup.string().email("Formato de e-mail inválido").required(),
  phone: yup
    .string()
    .strict()
    .matches(
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
      "Fomato de telefone inválido"
    ),
});

module.exports = contactsSchema;
