const jwtHelper = require('../helpers/jwt');
const jwtConfig = require('../config/constant/jwt');
const User = require('../models/user');
const { APIError } = require('../helpers/ErrorHandler');
let isAuth = async function(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        if (token) throw new APIError({ message: 'No token provided' });
        const decoded = await jwtHelper.verifyToken(token, jwtConfig.ACCESS.SECRET);
        req.jwtDecoded = decoded;
        next();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
};

module.exports = { isAuth };