exports.up = function(knex, Promise) {
  return knex.schema.createTable('ticket_thread', function(table) {
    table.increments();
    table.string('comment', 1000).notNullable();
    table.integer("ticket_id")
      .notNullable()
      .references("id")
      .inTable("ticket")
      .unsigned()
      .onDelete("CASCADE")
      .index();

    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ticket_thread');
};
