const fs = require('fs'),
	path = require('path');

function readSecret(file) {
	try {
		const pathFile = path.join(__dirname, './key', file + '.txt');
		const data = fs.readFileSync(pathFile, 'utf-8').trim();
		if (data.length === 0) throw new Error('Please check your jwt secret key');
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}

const jwtConfig = {
	ACCESS: readSecret('access'),
	REFRESH: readSecret('refresh'),
	VERIFY: readSecret('verify'),
	DEVICE: readSecret('device'),
	PASSWORD: readSecret('password'),
	SHORT_TIME: 900, //15 minutes
	LONG_TIME: 86400,
};
module.exports = jwtConfig;
