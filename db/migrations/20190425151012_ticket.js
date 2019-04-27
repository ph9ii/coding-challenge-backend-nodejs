
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ticket', function(table) {
    table.increments();
    table.integer("officer_id")
      .notNullable()
      .references("id")
      .inTable("officer")
      .unsigned()
      .onDelete("CASCADE")
      .index();
    table.string('name', 50).notNullable();
    table.string('email', 100).notNullable();
    table.string('status', 50).notNullable().defaultTo('open');
    table.string('day_phone', 100);
    table.string('eve_phone', 100);
    table.string('mob_phone', 100);

    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ticket');
};
