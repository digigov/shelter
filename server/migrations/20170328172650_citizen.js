exports.up = knex => (
  knex.schema.createTable('citizen', (table) => {
    table.bigInteger('id').unsigned().notNullable().primary();
    table.string('fullname');
    table.json('archive');
    table.timestamps();
  })
);

exports.down = knex => (
  knex.schema.dropTable('citizen')
);
