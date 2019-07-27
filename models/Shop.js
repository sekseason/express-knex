const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef Shop
 * @property {integer} id
 * @property {integer} user_id.required
 * @property {integer} package_id.required
 * @property {string} name.required
 * @property {text} aboutus
 * @property {enum} type - Default: public - eg: public,private
 */

class Shop extends Model {
  static get tableName() {
    return 'shop';
  }

  static get relationMappings() {
    const User = require('./User');
    const Package = require('./Package');

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'shop.user_id',
          to: 'users.id'
        }
      },
      package: {
        relation: Model.HasOneRelation,
        modelClass: Package,
        join: {
          from: 'shop.package_id',
          to: 'package.id'
        }
      }
    }
  }
}

module.exports = Shop;
