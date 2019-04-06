const config = {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || '3000'),
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
    }
};

module.exports = config;
