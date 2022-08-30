const knex = require("../database");
const { CrudError, ForbiddenError } = require("../helpers/apiErrors");
const contactsSchema = require("../validations/contactsSchema");

const getAllContacts = async (req, res) => {
  const { id } = req.user;

  const contacts = await knex("contacts").where("user_id", id);
  return res.json(contacts);
};

const getContact = async (req, res) => {
  const { id: userID } = req.user;
  const { id } = req.params;

  const contact = await knex("contacts").where({ user_id: userID, id }).first();

  return res.json(contact);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.user;

  await contactsSchema.validate({ name, email, phone });

  const insertContact = await knex("contacts").insert({
    user_id: id,
    name,
    email,
    phone,
  });

  if (!insertContact) {
    throw new CrudError("Não foi possível cadastrar o contato");
  }

  return res.status(201).json();
};

const deleteContact = async (req, res) => {
  const { id: userID } = req.user;
  const { id } = req.params;

  const contact = await knex("contacts").where({ id }).first();

  if (contact.user_id === Number(userID)) {
    const deleteContact = await knex("contacts")
      .del()
      .where({ user_id: userID, id });

    if (!deleteContact) {
      throw new CrudError("Não foi possível deletar o contato");
    }

    return res.status(204).json();
  } else {
    throw new ForbiddenError(`Não foi possível excluir o contato`);
  }
};

const editContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id: userID } = req.user;
  const { id } = req.params;

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
      throw new CrudError("Não foi possível atualizar o contato");
    }

    return res.status(204).json();
  } else {
    throw new ForbiddenError(`Não foi possível atualizar o contato`);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
};
