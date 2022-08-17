const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("users").del();
  await knex("users").insert([
    {
      name: "Testman",
      email: "testman@email.com",
      passwd: await bcrypt.hash("bobo123456", Number(process.env.SALT_ROUNS)),
    },
  ]);
};
