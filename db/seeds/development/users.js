const bcrypt = require('bcrypt');

const tabaleName = 'users';

exports.seed = knex => {
  return knex(tabaleName).del()
    .then(async () => {
      let hashPassword = '';

      await bcrypt.hash('Password@01', 10)
        .then(hash => hashPassword = hash);

      return knex(tabaleName).insert([
        {
          id: 1,
          username: 'admin',
          password: hashPassword,
          email: 'admin@example.com'
        }
      ]);
    });
};
