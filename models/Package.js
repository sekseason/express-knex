const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex);

/**
 * @typedef Package
 * @property {integer} id
 * @property {string} name.required
 */

class Package extends Model {
  static get tableName() {
    return 'packages';
  }
}

module.exports = Package;
