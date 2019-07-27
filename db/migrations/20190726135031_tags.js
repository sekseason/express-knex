const tabaleName = 'tags';

exports.up = knex => {
  return knex.schema.createTable(tabaleName, table => {
    table.increments('id');
    table.string('name');
  });
};

exports.down = knex => {
  return knex.schema.dropTable(tabaleName);
};
