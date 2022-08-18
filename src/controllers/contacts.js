const knex = require("../database");
const contactsSchema = require("../validations/contactsSchema");

const getAllContacts = async (req, res) => {
  const { id } = req.user;

  try {
    const contacts = await knex("contacts").where("user_id", id);
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getContact = async (req, res) => {
  const { id: userID } = req.user;
  const { id } = req.params;

  try {
    const contact = await knex("contacts")
      .where({ user_id: userID, id })
      .first();

    return res.json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.user;

  try {
    await contactsSchema.validate({ name, email, phone });

    const insertContact = await knex("contacts").insert({
      user_id: id,
      name,
      email,
      phone,
    });

    if (!insertContact) {
      return res
        .status(500)
        .json({ message: "Não foi possível cadastrar o contato" });
    }

    return res.status(201).json();
  } catch (error) {
    return res
      .status(error.name === "ValidationError" ? 400 : 500)
      .json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { id: userID } = req.user;
  const { id } = req.params;

  try {
    const contact = await knex("contacts").where({ id }).first();

    if (contact.user_id === Number(userID)) {
      const deleteContact = await knex("contacts")
        .del()
        .where({ user_id: userID, id });

      if (!deleteContact) {
        return res
          .status(500)
          .json({ message: "Não foi possível deletar o contato" });
      }

      return res.status(204).json();
    } else {
      return res.status(401).json({ message: "Não autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id: userID } = req.user;
  const { id } = req.params;

  try {
    await contactsSchema.validate({ name, email, phone });

    const contact = await knex("contacts").where({ id }).first();

    if (contact.user_id === Number(userID)) {
      const updateContact = await knex("contacts")
        .update({
          user_id: userID,
          name,
          email,
          phone,
        })
        .where({ id });

      if (!updateContact) {
        return res
          .status(500)
          .json({ message: "Não foi possível atualizar o contato" });
      }

      return res.status(204).json();
    } else {
      return res.status(401).json({ message: "Não autorizado" });
    }
  } catch (error) {
    return res
      .status(error.name === "ValidationError" ? 400 : 500)
      .json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
};
