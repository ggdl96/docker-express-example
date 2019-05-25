const bluebird = require('bluebird');
const redis = require('redis');
const config = require('../config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const options = {
    host: config.redis.host,
    port: config.redis.port,
};
  
module.exports = redis.createClient(options);
