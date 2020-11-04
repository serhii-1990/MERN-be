const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const Secrets = require('../secrets');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication feild!');
    }
    const decodedToken = jwt.verify(token, Secrets.jwtKey);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication feild!', 401);
    return next(error);
  }
};
