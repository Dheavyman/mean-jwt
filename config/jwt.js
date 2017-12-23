/**
 * Module dependencies
 */
const jwt = require('jsonwebtoken'),
  config = require('./config');

module.exports = {
  /**
   * Generate token for user
   *
   * @param {any} user - The user details
   * @returns {string} - The token generated
   */
  generateToken(user) {
    const token = jwt.sign({
      user: {
        id: user._id,
      }
    }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  },
};
