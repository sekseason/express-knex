const tabaleName = 'tags';

exports.seed = knex => {
  return knex(tabaleName).del()
    .then(() => {
      return knex(tabaleName).insert([
        {
          id: 1,
          name: 'Demo Tag'
        }
      ]);
    });
};
