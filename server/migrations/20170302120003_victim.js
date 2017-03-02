exports.up = knex => (
  knex.schema.createTable('victim', (table) => {
    table.bigInteger('id').unsigned().notNullable().primary();
    table.string('fullname');
    table.json('archive');
    table.timestamps();
    table.dateTime('deleted_at');
  })
);

exports.down = knex => (
  knex.schema.dropTable('victim')
);
