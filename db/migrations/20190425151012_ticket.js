exports.up = async function(knex, Promise) {
  await knex.schema.createTable('ticket', function(table) {
    table.increments();
    table.string('full_name', 255).notNullable();
    table.string('email', 100).notNullable();
    table.string('license_number', 50).notNullable();
    table.string('color', 50).notNullable();
    table.string('type', 50).notNullable();
    table.string('description', 1000).notNullable();
    table.dateTime('datetime').notNullable();
    table.string('status', 50).notNullable().defaultTo('open');
    table.string('day_phone', 100);
    table.string('eve_phone', 100);
    table.string('mob_phone', 100);
    table.integer("officer_id")
      .notNullable()
      .references("id")
      .inTable("officer")
      .unsigned()
      .onDelete("CASCADE")
      .index();

    table.timestamps(true, true);
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('ticket');
};
