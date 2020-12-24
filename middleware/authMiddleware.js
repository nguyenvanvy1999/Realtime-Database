const jwtHelper = require('../helpers/jwt');
const config = require('../config/constants');
const User = require('../models/user');
const HTTP_STATUS_CODE = require('../config/constants').HTTP_STATUS_CODE;
let isAuth = async function(req, res, next) {
    const tokenFromClient =
        req.body.token || req.query.token || req.header['token'];
    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(
                tokenFromClient,
                config.jwt.accessSecret
            );
            req.jwtDecoded = decoded;
            next();
        } catch (error) {
            return res
                .status(HTTP_STATUS_CODE.ERROR.UNAUTHORIZED)
                .json({ message: 'Unauthorized.' });
        }
    } else {
        return res.status(HTTP_STATUS_CODE.ERROR.FORBIDDEN).send({
            message: 'No token provided.',
        });
    }
};
let isActive = async function(req, res, next) {
    let email = req.body.email;
    let user = await User.findOne({ email: email });
    if (user) {
        if (user.isActive === true) {
            next();
        } else {
            return res
                .status(HTTP_STATUS_CODE.ERROR.UNAUTHORIZED)
                .send({ message: 'Account not active. Please active first' });
        }
    }
    return res
        .status(HTTP_STATUS_CODE.ERROR.UNAUTHORIZED)
        .send({ message: 'Not found user' });
};

module.exports = {
    isAuth: isAuth,
    isActive: isActive,
};