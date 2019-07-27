const tabaleName = 'material';

exports.up = knex => {
  return knex.schema.createTable(tabaleName, table => {
    table.increments('id');
    table.string('ssku');
    table.string('stone_group');
    table.string('stone').nullable();
    table.string('shape').nullable();
    table.integer('quality').defaultTo(0);
    table.string('type').nullable();
    table.string('clarity').nullable();
    table.string('polish').nullable();
    table.string('color').nullable();
    table.string('size').nullable();
    table.string('alignment').nullable();
    table.integer('pcs').defaultTo(0);
    table.integer('weight').defaultTo(0);
    table.decimal('price', 10, 2).defaultTo(0.00);
    table.string('unit').nullable();
    table.string('setting_type').nullable();
    table.string('certificate_type').nullable();
    table.string('certificate_no').nullable();
    table.text('description').nullable();;
  });
};

exports.down = knex => {
  return knex.schema.dropTable(tabaleName);
};
