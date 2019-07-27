const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef Collection
 * @property {integer} id
 * @property {string} name.required
 * @property {enum} show.required - Show flag (Default: yes) - eg: yes,no
 */

class Collection extends Model {
  static get tableName() {
    return 'collection';
  }
}

module.exports = Collection;
