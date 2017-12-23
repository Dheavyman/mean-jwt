/**
 * Module dependencies
 */
const jwt = require('jsonwebtoken'),
config = require('../config');

module.exports = {
  /**
   * Verify token for protected routes
   * 
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {func} next - Call the next route handler function
   * @returns {any} Error response object or
   * call to next route handler
   */
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token ||
                  req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 'Fail',
        message: 'Unauthenticated access, no token provided'
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        if (err.message.includes('token')) {
          return res.status(401).send({
            status: 'Error',
            message: 'Invalid token'
          });
        }
        return res.status(401).send({
          status: 'Error',
          message: err.message,
        });
      }
      req.decoded = decoded;
      return next();
    });
  }
};
