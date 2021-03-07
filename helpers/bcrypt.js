const bcrypt = require('bcrypt'),
	{ APIError } = require('./error'),
	{ get } = require('../config/index');
async function hash(password) {
	try {
		return await bcrypt.hash(password, get('SALT'));
	} catch (error) {
		throw new APIError({ message: error.message, errors: error });
	}
}
async function compare(password, hash) {
	try {
		return await bcrypt.compare(password, hash);
	} catch (error) {
		throw new APIError({ message: error.message, errors: error });
	}
}

module.exports = { hash, compare };
