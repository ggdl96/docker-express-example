const jwt = require('jsonwebtoken');
const config = require('../config');

async function generateToken(user = {}) {
    try {
        if (!(user.name && user.email && user.role)) {
            throw new Error('Can\'t generate token. Please provide a valid user');
        }

        return jwt.sign(
            {...user},
            config.jwt.privateKey,
            { algorithm: 'RS256', expiresIn: 1000 * 20 }
        );
    } catch (e) {
        return Promise.reject(e);
    }
}

function decode(token, options = {}) {
    if (!token) {
        throw new Error('No token was provided');
    }
    return jwt.decode(token, { ...options });
}

module.exports = { generateToken, decode };