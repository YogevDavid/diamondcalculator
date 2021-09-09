const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/users');
const CalcLogic = require('../models/calcLogics');
const Constants = require('../utils/constants');

// Seting up a default route for users.js
router.post(
  '/',
  // Validation when posting a new user register request
  [
    check('name', 'The name field is required').not().isEmpty(),
    check('email', 'Not a valid Email address').isEmail(),
    check('password', 'Password has to be at least 6 charecters long').isLength(
      { min: 6 }
    ),
  ],
  // Since we're waiting for bcrypt and mongoose (from the models/outform/user) we have to user an async function
  async (req, res) => {
    // Creating errors for validationResult
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring the req.body into variables
    const { name, email, password } = req.body;

    try {
      // Checking to see if the user already exists in DB
      let user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        return res.sendStatus(200);
      }

      // Creating a user instance
      user = new User({
        name,
        email: email.toLowerCase(),
        password,
      });

      let calcLogic = new CalcLogic({});

      // Creating a salt to hash the user.password with, using bcryptjs
      // 10 means how many rounds (the more you have the more secure, 10 is recoomended in the documentation)
      const salt = await bcrypt.genSalt(10);
      // Hashing the password and puting it back into user.password
      user.password = await bcrypt.hash(password, salt);
      // Saving the user
      await user.save();

      calcLogic.chartValues = Constants.getDefalutChart();
      calcLogic.user = user._id;
      await calcLogic.save();

      // Initiating the payload for JWT (the id is generated automatically in mongoDB)
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
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
