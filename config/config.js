module.exports = {
  'secret': process.env.JWT_SECRET || 'mysecret',
  'database': process.env.MONGO_DB || 'mongodb://localhost/jwt_test',
};
