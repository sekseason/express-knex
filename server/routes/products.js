const express = require('express');
const Multer = require('multer');
const { format } = require('util');

const Product = require('../../models/Product');
const storage = require('../storage');

const router = express.Router();
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 200 * 1024 * 1024, // 5MB
  },
});

/**
 * @route GET /products
 * @group Products
 * @returns {Array.<ProductResponse>} 200
 */
router.get('/', async (req, res) => {
  try {
    await Product
      .query()
      .omit(['user_id', 'shop_id'])
      .eager('[productDetail, shops, user]')
      .then(products => {
        res.json(products);
      });
  } catch (errors) {
    res
      .status(500)
      .json({ errors: errors });
  }
});

/**
 * @route POST /products
 * @group Products
 * @param {Product.model} product.body
 * @returns {ProductResponse.model} 200 - Create product successfully
 * @returns {Array} 422 - Validation error
 * @returns {string} 500 - Internal error
 */
router.post('/products', async (req, res) => {

});

/**
 * Upload image in base64 format
 * 
 * @route POST /products/{id}/upload
 * @group Products
 * @param {integer} id.path.required
 * @param {file} file.formData.required
 * @returns {object} 200
 * @returns {Error}  default
 */
router.post('/:id/upload', multer.single('file'), async (req, res) => {
  let id = parseInt(req.params.id);

  if (!req.file) {
    res.status(400).send('No file uploaded.');

    return;
  }

  const blob = storage.file(id + '-' + req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    res.status(500).json({ errors: err });
  });

  blobStream.on('finish', () => {
    const publicUrl = format(`https://storage.googleapis.com/${storage.name}/${blob.name}`);

    res.json({
      id: id,
      path: publicUrl
    });
  });

  blobStream.end(req.file.buffer);
});

/**
 * @route GET /products/{id}
 * @group Products
 * @param {intenger} id.path.required
 * @returns {ProductRelationsResponse.model} 200
 * @returns {string} 204 - No Content
 */
router.get('/:id', async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    await Product
      .query()
      .$relatedQuery('productDetail')
      .$relatedQuery('shops')
      .findById(id)
      .then(product => {
        res.json(product);
      });
  } catch (errors) {
    res.status(204); // 204: no content
  }
});

module.exports = router;
