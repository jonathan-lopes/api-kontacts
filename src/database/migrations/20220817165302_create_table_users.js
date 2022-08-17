/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = (knex) =>
 knex.schema.createTable("users", (table) => {
   table.increments("id");
   table.text("name").notNullable();
   table.text("email").notNullable().unique();
   table.text("passwd").notNullable();
 });

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) => knex.dropTable("users");
