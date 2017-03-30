exports.up = knex => (
  knex.schema.createTable('action', (table) => {
    table.increments('id').primary();
    table.bigInteger('victim_id').unsigned().notNullable();
    table.string('action');
    table.json('archive');
    table.timestamps();
    table.dateTime('deleted_at');
  })
);

exports.down = knex => (
  knex.schema.dropTable('action')
);
