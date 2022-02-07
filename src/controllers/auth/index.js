const core = require('../../services/coreAPI');
const jwt = require('../../services/jwt');
const createHash = require('hash-generator');
const hashLength = 14;
const config = require('../../config');
const createError = require('http-errors');

function getAuthorizationFromHeader(authorizationHeader) {
    const authorization = authorizationHeader;

    if (!authorization) {
        throw createError.BadRequest('User Unauthorized');
    }
    if (!authorization.includes('Bearer ')) {
        // throw exception
        throw createError.BadRequest('Bad Authorization');
    }

    return authorization.replace('Bearer ', '');
}

function auth(redis) {
    const login = async (req, res, next) => {
        try {
            const user = await core.getUser(req.body.email, req.body.password);
            const token = await jwt.generateToken(user);
            let refreshToken = undefined;

            if (req.body.rememberme) {
                refreshToken = createHash(hashLength);

                await redis.setAsync(refreshToken, JSON.stringify(user), 'EX', 4000);
            }

            if (config.env === 'production') {
                res
                    .status(200)
                    .cookie(
                        'rememberme',
                        { token, refresh_token: refreshToken },
                        {
                            expires: new Date(Date.now() + 1000),
                            httpOnly: true,
                            domain: '',
                        }
                    )
                    .send({status: 'OK'});
            } else {
                res
                    .status(200)
                    .data = {
                        token,
                        refresh_token: refreshToken,
                    };

                next();
            }
        } catch (e) {
            next(e);
        }
    };
    
    const logout = async (req, res, next) => {
        try {
            const token = config.env === 'production'
                ? ''
                : getAuthorizationFromHeader(req.headers.authorization);

            await redis.setAsync(token, 'LOGOUT', 'EX', 30);

            res.data = {
                description: 'Logged Out',
            };

            next();
        } catch (e) {
            next(e);
        }
    };
    
    const refresh = async (req, res, next) => { 
        try {
            const refreshTokenFromRequest = req.body.refresh_token;

            if (!refreshTokenFromRequest) {
                throw createError.BadRequest('No Refresh Token was present');
            }

            const user = JSON.parse(await redis.getAsync(refreshTokenFromRequest)); 

            if (!user) {
                throw createError.BadRequest('Not Found');
            }

            if (config.env === 'production') {
                // work with cookie
            } else {
                // work with request body
                const newToken = await jwt.generateToken({
                    ...user,
                });

                res.data = {
                    token: newToken,
                };

                next();
            }
        } catch (e) {
            res.status(500);
            next(e);
        }
    };

    return { login, logout, refresh };
}

module.exports = auth;
