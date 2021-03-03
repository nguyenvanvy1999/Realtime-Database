const winston = require('winston'),
	path = require('path'),
	{ get } = require('../config/index');

let file;
if (get('DEBUG')) file = path.join(__dirname, '../logs/test.log');
else file = path.join(__dirname, '../logs/error.log');

module.exports = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.colorize(),
		winston.format.printf((log) => {
			if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
			return `[${log.timestamp}] [${log.level}] ${log.message}`;
		})
	),
	transports: [
		//new winston.transports.Console(),
		new winston.transports.File({
			level: 'error',
			filename: file,
		}),
	],
});
