const express = require('express');
const multer = require('multer');

const ProductDetail = require('../../models/ProductDetail');

const router = express.Router();

/**
 * @route GET /products/{id}/detail
 * @group Products
 * @param {integer} id.path.required
 * @returns {object} 200
 */
router.get('/', (req, res, next) => {
  res.json({info: 'Olufy Jeweal - API v1.0.0'});
});

module.exports = router;
