const jwtHelper = require('../helpers/jwt');
const jwtConfig = require('../config/constant/jwt');
const User = require('../models/user');
const { APIError } = require('../helpers/error');

async function isAuth(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        const decoded = await jwtHelper.verifyToken(token, jwtConfig.ACCESS.SECRET);
        req.jwtDecoded = decoded;
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = { isAuth };