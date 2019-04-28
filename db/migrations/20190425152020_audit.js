exports.up = async function(knex, Promise) {
  await knex.schema.createTable('audit', function(table) {
    table.increments();
    table.integer("ticket_id")
      .notNullable()
    	.references("id")
    	.inTable("ticket")
    	.unsigned()
      .onDelete("CASCADE")
    	.index();
    table.text("message").notNullable();
    table.integer("code").notNullable();
    
    table.timestamps(true, true);
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('audit');
};
