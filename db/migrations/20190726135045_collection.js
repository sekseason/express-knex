const tabaleName = 'collection';

exports.up = knex => {
  return knex.schema.createTable(tabaleName, table => {
    table.increments('id');
    table.string('name');
    table.enum('show', ['yes', 'no']);
  });
};

exports.down = knex => {
  return knex.schema.dropTable(tabaleName);
};
