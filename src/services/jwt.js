const jwt = require('jsonwebtoken');
const config = require('../config');

async function generateToken(user) {
  try {
    return jwt.sign({...user}, config.jwt.privateKey, { algorithm: 'RS256' });
  } catch (e) {
    throw e;
  }
}

module.exports = { generateToken };