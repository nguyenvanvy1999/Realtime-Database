const jwtHelper = require('../helpers/jwt'),
	{ jwtConfig } = require('../config/jwt');

async function isAuth(req, res, next) {
	try {
		const token = req.body.token || req.query.token || req.headers['token'];
		const decoded = await jwtHelper.verifyToken(token, jwtConfig.ACCESS);
		req.user = decoded.data;
		next();
	} catch (error) {
		next(error);
	}
}
module.exports = { isAuth };
