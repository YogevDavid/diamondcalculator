const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    return res.json(user);
  } catch (err) {
    console.err(err.message);
    return res.status(500).send('Server Error');
  }
});

// Login
router.post(
  '/',
  // Validation to see if credentials are correct
  [
    check('email', 'Not a valid Email address').isEmail(),
    check('password', 'Password field is required').exists(),
  ],
  async (req, res) => {
    // Creating errors for validationResult
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring the req.body into variables
    const { email, password } = req.body;
    try {
      // Checking to see if the user exists in DB
      let user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Using bcrypt.compare method to see if the user password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Initiating the payload for JWT (the id was generated automatically in mongoDB)
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Setting up JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
