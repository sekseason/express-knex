const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

const router = express.Router();

/**
 * @route GET /users
 * @group Users
 * @returns {Array.<UserResponse>} 200
 */
router.get('/', async (req, res, next) => {
  try {
    await User
      .query()
      .omit(['password'])
      .then(users => {
        res.json(users);
      });
  } catch (errors) {
    res
      .status(500)
      .json({ errors: errors });
  }
});

/**
 * @route POST /users
 * @group Users
 * @param {User.model} user.body
 * @returns {UserResponse.model} 200 - Create user successfully
 * @returns {Array} 422 - Validation error
 * @returns {string} 500 - Internal error
 */
router.post('/', [
  check('username').isLength({ min: 4 }),
  check('password')
    .isLength({ min: 6 })
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirm_password) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
  check('email').isEmail(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array() });
  }

  let password = '';

  await bcrypt.hash(req.body.password, 10)
    .then(hash => password = hash);

  try {
    await User
      .query()
      .omit(['password'])
      .insert({
        username: req.body.username,
        password: password,
        email: req.body.email
      })
      .then(user => res.json(user));
  } catch (err) {
    res.status(500);

    if (err.code === 'ER_DUP_ENTRY') {
      res.status(422);
    }

    res.json({ errors: err });
  }
});

/**
 * @route GET /users/{id}
 * @group Users
 * @param {intenger} id.path
 * @returns {UserResponse.model} 200
 * @returns {string} 204 - No Content
 */
router.get('/:id', async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    await User
      .query()
      .omit(['password'])
      .findById(id)
      .then(user => {
        res.json(user);
      });
  } catch (errors) {
    res.status(204); // 204: no content
  }
});

module.exports = router;
