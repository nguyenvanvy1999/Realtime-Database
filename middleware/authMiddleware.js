const jwtHelper = require('../helpers/jwt');
const config = require('../config/constants');

let isAuth = async(req, res, next) => {
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
            return res.status(401).json({ message: 'Unauthorized.' });
        }
    } else {
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};

module.exports = {
    isAuth: isAuth,
};