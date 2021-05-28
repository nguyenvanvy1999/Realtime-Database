const fs = require('fs'),
	joi = require('joi'),
	{ parse } = require('dotenv'),
	path = require('path');

require('dotenv').config();

function checkEnv(envConfig) {
	const envSchema = joi
		.object({
			NODE_ENV: joi.string().valid('dev', 'prod').default('dev'),
			PORT: joi.number().default(8080),
			URL: joi
				.string()
				.uri({ scheme: [/https?/] })
				.required(),
			DEBUG: joi.boolean().default(false),
			MONGO_URI: joi
				.string()
				.regex(/^mongodb/)
				.default('mongodb://localhost:27017/Project1'),
			SMTP_USER: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } }),
			SMTP_PASSWORD: joi.string(),
			SENDGRID_API_KEY: joi.string(),
			WEBTOKEN_SECRET_KEY: joi.string(),
			WEBTOKEN_EXP: joi.number().default(1800),
			SALT: joi.number().min(4).max(15).default(5),
		})
		.or('SMTP_USER', 'SENDGRID_API_KEY')
		.and('SMTP_USER', 'SMTP_PASSWORD');
	const { error, value } = envSchema.validate(envConfig);
	if (error) throw new Error(`ENV validation error: ${error.message}`);
	return value;
}

function get(key) {
	let config = parse(fs.readFileSync('.env'));
	config = checkEnv(config);
	config.PATH = path.join(__dirname, '../', 'uploads');
	fs.mkdirSync(config.PATH, { recursive: true });
	return config[key];
}

module.exports = { get };
