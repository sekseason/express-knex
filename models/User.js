const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef User
 * @property {string} username.required - Min length 4 characters
 * @property {string} password.required - Min length 6 characters
 * @property {string} confirm_password.required
 * @property {string} email.required - email address
 */

/**
 * @typedef UserResponse
 * @property {integer} id
 * @property {string} username
 * @property {string} email
 */

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Shop = require('./Shop');
    const Product = require('./Product');

    return {
      shops: {
        relation: Model.HasManyRelation,
        modelClass: Shop,
        join: {
          from: 'users.id',
          to: 'shop.user_id'
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'users.id',
          to: 'product.user_id'
        }
      }
    }
  }
}

module.exports = User;
