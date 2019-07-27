const tabaleName = 'material';

exports.seed = knex => {
  return knex(tabaleName).del()
    .then(() => {
      // return knex(tabaleName).insert([
      //   {
      //     id: 1,
      //     name: 'Demo Collection',
      //   }
      // ]);
    });
};
