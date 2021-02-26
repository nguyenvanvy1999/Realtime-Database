const Joi = require('joi'),
	jsonwebtoken = require('jsonwebtoken'),
	{ Segments } = require('celebrate'),
	joi = require('joi');

/**
 * Joi custom :JoiOID and JoiJWT
 */
const joiOID = Joi.extend({
	type: 'objectId',
	messages: {
		invalid: 'It must have a valid ObjectId',
	},
	validate(value, helpers) {
		const objIdPattern = /^[0-9a-fA-F]{24}$/;
		const isValid = (value) => {
			return Boolean(value) && !Array.isArray(value) && objIdPattern.test(String(value));
		};
		if (!isValid(value)) return { value, errors: helpers.error('invalid') };
	},
});

const joiJWT = Joi.extend({
	type: 'jwt',
	messages: {
		invalid: 'It must have a valid JWT',
	},
	validate(value, helpers) {
		const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
		if (!jwtPattern.test(String(value))) return { value, errors: helpers.error('invalid') };
		const decoded = jsonwebtoken.decode(value);
		if (!decoded) return { value, errors: helpers.error('invalid') };
	},
});
/**
 *Define some thing of joi
 */
const joiConfig = {
	string: joi.string().required(),
	_id: joiOID.objectId().required(),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } })
		.required(),
	username: joi.string().alphanum().min(4).max(20).required(),
	password: joi
		.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.min(4)
		.required(), //FIXME: none !@#
	role: joi.string().valid('Admin', 'User'),
	token: joiJWT.jwt().required(),
};
/**
 * Joi Schema using middleware celebrate
 */

const celebrateSchema = {
	user: {
		login: {
			[Segments.BODY]: { email: joiConfig.email, password: joiConfig.password },
		},
		signup: {
			[Segments.BODY]: {
				email: joiConfig.email,
				firstName: joiConfig.string,
				lastName: joiConfig.string,
				password: joiConfig.password,
				confirmPassword: joiConfig.password,
			},
		},
		search: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.PARAMS]: {}, //FIXME:
		},
		editProfile: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				firstName: joiConfig.string,
				lastName: joiConfig.string,
			},
		},
		editPassword: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				password: joiConfig.password,
				confirmPassword: joi.string().valid(joi.ref('password')).required(),
			},
		},
		verifyAccount: {
			[Segments.QUERY]: joiConfig.token,
		},
		getForgotPassword: {
			[Segments.BODY]: { email: joiConfig.email },
		},
		postForgotPassword: {
			[Segments.QUERY]: joiConfig.token,
			[Segments.BODY]: {
				password: joiConfig.password,
				confirmPassword: joi.string().valid(joi.ref('password')).required(),
			},
		},
		token: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
		},
	},
	device: {
		getDevice: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				type: joiConfig.string,
				model: joiConfig.string,
				name: joiConfig.string,
				deviceID: joiConfig.string,
			},
		},
		deviceID: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.QUERY]: { deviceID: joiConfig._id },
		},
	},
	zone: {
		newZone: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				description: joiConfig.string,
				name: joiConfig.string,
				deviceID: joiConfig._id,
			},
		},
		one: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				zoneID: joiConfig._id,
				deviceID: joiConfig._id,
			},
		},
		many: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				zoneID: joiConfig._id.required(),
				devicesID: joi.array().items(joiConfig._id.required()),
			},
		},
	},
};

module.exports = celebrateSchema;
