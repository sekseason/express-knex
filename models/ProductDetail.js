const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef ProductDetail
 * @property {integer} id
 * @property {integer} product_id.required
 * @property {integer} material_id.required
 * @property {string} gross_weight
 * @property {string} net_weight
 * @property {string} unit
 * @property {string} thumbnail
 * @property {string} image
 * @property {text} remark
 */

class ProductDetail extends Model {
  static get tableName() {
    return 'product_detail';
  }

  static get relationMappings() {
    const Material = require('./Material');

    return {
      material: {
        relation: Model.HasOneRelation,
        modelClass: Material,
        join: {
          from: 'product_detail.material_id',
          to: 'material.id'
        }
      }
    }
  }
}

module.exports = ProductDetail;
