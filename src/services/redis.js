const bluebird = require('bluebird');
const redis = require('redis');
const config = require('../config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const options = {
    host: config.redis.host,
    port: config.redis.port,
};

const createClientForRefreshTokens = () => redis.createClient({ ...options, db: '1' });
const createClientForExcludedTokens = () => redis.createClient({ ...options, db: '2' });

module.exports = { createClientForRefreshTokens, createClientForExcludedTokens };
