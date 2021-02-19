const joi = require('joi'),
    joiConfig = require('../../constant/joi'),
    { Segments } = require('celebrate');

const celebrateSchema = {
    user: {
        login: {
            [Segments.BODY]: { email: joiConfig.user.email, password: joiConfig.user.password },
        },
        signup: {
            [Segments.BODY]: {
                email: joiConfig.user.email,
                firstName: joiConfig.general.string,
                lastName: joiConfig.general.string,
                password: joiConfig.user.password,
                confirmPassword: joiConfig.user.password,
            },
        },
        search: {
            [Segments.BODY]: {}, //FIXME:
        },
        editProfile: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
            [Segments.BODY]: {
                firstName: joiConfig.general.string,
                lastName: joiConfig.general.string,
            },
        },
        editPassword: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
            [Segments.BODY]: {
                password: joiConfig.user.password,
                confirmPassword: joiConfig.user.password,
            },
        },
        forgotPassword: {
            [Segments.BODY]: {},
        }, //FIXME:
        token: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
        },
    },
    device: {
        getDevice: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
            [Segments.BODY]: {
                type: joiConfig.general.string,
                model: joiConfig.general.string,
                name: joiConfig.general.string,
                deviceID: joiConfig.general.string,
            },
        },
        deviceID: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
            [Segments.PARAMS]: { deviceID: joiConfig.general._id },
        },
    },
    zone: {
        newZone: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
            [Segments.BODY]: {
                description: joiConfig.general.string,
                name: joiConfig.general.string,
                deviceID: joiConfig.general._id,
            },
        },
        one: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
            [Segments.BODY]: {
                zoneID: joiConfig.general._id,
                deviceID: joiConfig.general._id,
            },
        },
        many: {
            [Segments.HEADERS]: joi.object({ token: joiConfig.user.token }).unknown(),
            [Segments.BODY]: {
                zoneID: joiConfig.general._id.required(),
                devicesID: joi.array().items(joiConfig.general._id.required()),
            },
        },
    },
};

module.exports = celebrateSchema;