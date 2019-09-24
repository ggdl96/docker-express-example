process.env.TZ = 'UTC'; // Set default timezone to UTC

const config = {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || '3000'),
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
    }
};

let env = {};
const envPath = `${__dirname}/config.${config.env}.js`;

env = require(envPath); // eslint-disable-line global-require

const finalConfig = {...config, ...env};

module.exports = finalConfig;