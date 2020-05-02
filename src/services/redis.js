const bluebird = require('bluebird');
const redis = require('redis');
const config = require('../config');
const { default: logger, error: loggerError } = require('../logger');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const options = {
    host: config.redis.host,
    port: config.redis.port,
};

const createClient = (createClientCallback) => {
    logger.info('creating redis client');
    const client = createClientCallback();

    client.on('error', () => {
        loggerError.error('error on redis');
    });
    return () => client;
};

const createClientForRefreshTokens = createClient(() => redis.createClient({ ...options, db: '1' }));
const createClientForExcludedTokens = createClient(() => redis.createClient({ ...options, db: '2' }));

module.exports = { createClientForRefreshTokens, createClientForExcludedTokens };
