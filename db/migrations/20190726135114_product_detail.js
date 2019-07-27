const tabaleName = 'product_detail';

exports.up = knex => {
  return knex.schema.createTable(tabaleName, table => {
    table.increments('id');
    table.integer('product_id').unsigned();
    table.integer('material_id').unsigned();
    table.string('gross_weight').nullable();
    table.string('net_weight').nullable();
    table.string('unit').nullable();
    table.string('thumbnail').nullable();
    table.string('image').nullable();
    table.text('remark').nullable();

    table.foreign('product_id').references('id').inTable('products');
    table.foreign('material_id').references('id').inTable('material');
  });
};

exports.down = knex => {
  return knex.schema.dropTable(tabaleName);
};
