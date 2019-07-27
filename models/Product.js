const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef Product
 * @property {integer} user_id.required
 * @property {integer} shop_id.required
 * @property {string} sku.required
 * @property {string} code.required
 * @property {string} item
 * @property {string} labor
 */

 /**
 * @typedef ProductResponse
 * @property {integer} id
 * @property {integer} user_id
 * @property {integer} shop_id
 * @property {string} sku
 * @property {string} code
 * @property {string} item
 * @property {string} labor
 */

/**
 * @typedef ProductRelationsResponse
 * @property {integer} id
 * @property {string} sku
 * @property {string} code
 * @property {string} item
 * @property {string} labor
 * @property {ProductDetail.model} product_detail
 * @property {Array.<Shop>} shops
 * @property {UserResponse.model} user
 */

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get relationMappings() {
    const ProductDetail = require('./ProductDetail');
    const Shop = require('./Shop');
    const User = require('./User');

    return {
      productDetail: {
        relation: Model.HasOneRelation,
        modelClass: ProductDetail,
        join: {
          from: 'products.id',
          to: 'product_detail.product_id'
        }
      },
      shops: {
        relation: Model.HasManyRelation,
        modelClass: Shop,
        join: {
          from: 'products.shop_id',
          to: 'shop.id'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'products.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Product;
