
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('char_counts', (table) => {
    table.increments('id');
    table.string('character');
    table.integer('count');
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('char_count'),
]);
