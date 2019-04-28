exports.up = async function(knex, Promise) {
  await knex.schema.createTable('officer', function(table) {
    table.increments();
    table.string('name', 50).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 1024).notNullable();
    table.boolean('avail').defaultTo(true);
    table.boolean('admin').defaultTo(false);

    table.timestamps(true, true);
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('officer');
};
