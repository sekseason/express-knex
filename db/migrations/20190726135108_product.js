const tabaleName = 'products';

exports.up = knex => {
  return knex.schema.createTable(tabaleName, table => {
    table.increments('id');
    table.integer('user_id').unsigned();
    table.integer('shop_id').unsigned();
    table.string('sku');
    table.string('code');
    table.string('item').nullable();
    table.string('labor').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('shop_id').references('id').inTable('shop');
  });
};

exports.down = knex => {
  return knex.schema.dropTable(tabaleName);
};
