const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef Material
 * @property {integer} id
 * @property {string} ssku.required
 * @property {string} stone_group.required
 * @property {string} stone
 * @property {string} shape
 * @property {integer} quality - Default: 0
 * @property {string} type
 * @property {string} clarify
 * @property {string} polish
 * @property {string} color
 * @property {string} size
 * @property {string} alignment
 * @property {integer} pcs - Default: 0
 * @property {integer} weight - Default: 0
 * @property {decimal} price - Decimal(10,2)<br/>Default: 0.00
 * @property {string} unit
 * @property {string} setting_type
 * @property {string} certificate_type
 * @property {string} certificate_no
 * @property {text} description
 */

class Material extends Model {
  static get tableName() {
    return 'material';
  }
}

module.exports = Material;
