const jwt = require('jsonwebtoken');
const config = require('../config');

async function generateToken(user) {
    try {
        return jwt.sign(
            {...user},
            config.jwt.privateKey,
            { algorithm: 'RS256', expiresIn: 1000 * 20 }
        );
    } catch (e) {
        throw e;
    }
}

function decode(token, options) {
    return jwt.decode(token, { ...options });
}

module.exports = { generateToken, decode };