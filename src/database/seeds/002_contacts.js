/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("contacts").del();
  await knex("contacts").insert([
    {
      name: "Leonard Vega",
      email: "eget.lacus.mauris@yahoo.com",
      phone: "(58) 33946-3716",
      user_id: 1,
    },
    {
      name: "Hall Noble",
      email: "ipsum.nunc.id@yahoo.com",
      phone: "(65) 54755-1155",
      user_id: 1,
    },
    {
      name: "Josiah Stark",
      email: "praesent.eu.nulla@protonmail.com",
      phone: "(36) 71722-6093",
      user_id: 1,
    },
    {
      name: "Yael Gillespie",
      email: "nam@aol.com",
      phone: "(51) 78430-1589",
      user_id: 1,
    },
    {
      name: "Rashad Goff",
      email: "auctor.nunc.nulla@aol.com",
      phone: "(77) 44131-6652",
      user_id: 1,
    },
    {
      name: "Gage Keller",
      email: "a.arcu@hotmail.com",
      phone: "(94) 80416-8576",
      user_id: 1,
    },
    {
      name: "Nichole Clemons",
      email: "elit.pharetra.ut@hotmail.com",
      phone: "(11) 43942-0296",
      user_id: 1,
    },
    {
      name: "Hilda Winters",
      email: "et@outlook.com",
      phone: "(84) 26054-6813",
      user_id: 1,
    },
    {
      name: "Todd Leblanc",
      email: "posuere.cubilia@aol.com",
      phone: "(95) 36009-7631",
      user_id: 1,
    },
    {
      name: "Ashely Park",
      email: "lectus.sit.amet@aol.com",
      phone: "(43) 53385-2515",
      user_id: 1,
    },
  ]);
};
