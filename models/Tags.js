const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef Tags
 * @property {integer} id
 * @property {string} name.required
 */

class Tags extends Model {
  static get tableName() {
    return 'tags';
  }
}

module.exports = Tags;
