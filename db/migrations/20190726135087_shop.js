const tabaleName = 'shop';

exports.up = knex => {
  return knex.schema.createTable(tabaleName, table => {
    table.increments('id');
    table.integer('user_id').unsigned();
    table.integer('package_id').unsigned();
    table.string('name');
    table.text('aboutus').nullable();
    table.enum('type', ['public', 'private']).defaultTo('public');

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('package_id').references('id').inTable('packages');
  });
};

exports.down = knex => {
  return knex.schema.dropTable(tabaleName);
};
