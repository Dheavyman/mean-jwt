const UserController = require('../controllers/user'),
  auth = require('../../config/middleware/auth');

module.exports = (app) => {
  app.post('/api/signup', UserController.signup);
  app.post('/api/signin', UserController.signin);
  app.get('/api/users', auth.verifyToken, UserController.getUsers);
};
