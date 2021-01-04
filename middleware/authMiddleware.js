const jwtHelper = require('../helpers/jwt');
const jwtConfig = require('../config/constant/jwt');
const User = require('../models/user');
const { APIError } = require('../helpers/ErrorHandler');
let isAuth = async function(req, res, next) {
    try {
        const tokenFromClient =
            req.body.token || req.query.token || req.header['token'];
        if (tokenFromClient) {
            try {
                const decoded = await jwtHelper.verifyToken(
                    tokenFromClient,
                    jwtConfig.accessSecret
                );
                req.jwtDecoded = decoded;
                next();
            } catch (error) {
                throw new APIError({ message: 'Unauthorized' });
            }
        } else {
            throw new APIError({ message: 'No token provided' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    isAuth: isAuth,
};