const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Getting the token from header
  const token = req.header('x-auth-token');

  // Check if there's a token
  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }
  // Verefying the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Take the req object and assign decoded.user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
