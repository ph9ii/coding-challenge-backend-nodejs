exports.up = async function(knex, Promise) {
  await knex.schema.createTable('ticket_thread', function(table) {
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

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('ticket_thread');
};
