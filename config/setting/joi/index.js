const joi = require('joi');
const joiConfig = require('../../constant/joi');

const joiSchema = {
    user: {
        signUpSchema: joi.object({
            email: joiConfig.user.email,
            username: joiConfig.user.username,
            password: joiConfig.user.password,
        }),
        signInSchema: joi.object({
            email: joiConfig.user.email,
            password: joiConfig.user.password,
        }),
        editUserSchema: joi.object({
            token: joiConfig.user.token,
            username: joiConfig.user.username,
            password: joiConfig.user.password,
        }),
        tokenSchema: joi
            .object({
                headers: joi.object({ token: joiConfig.user.token }).unknown(true),
            })
            .unknown(true),
    },
    device: {
        getDevice: joi
            .object({
                headers: joi.object({ token: joiConfig.user.token }).unknown(true),
                body: joi
                    .object({
                        type: joiConfig.general.string,
                        model: joiConfig.general.string,
                        name: joiConfig.general.string,
                        deviceID: joiConfig.general.string,
                    })
                    .unknown(false),
            })
            .unknown(true),
        deviceID: joiConfig.general._id.required(),
    },
    zone: {
        newZone: {
            token: joiConfig.user.token,
            description: joiConfig.general.string,
            name: joiConfig.general.string.required(),
            deviceID: joiConfig.general._id.required(),
        },
        one: {
            zoneID: joiConfig.general._id.required(),
            deviceID: joiConfig.general._id.required(),
        },
        many: {
            zoneID: joiConfig.general._id.required(),
            devicesID: joi.array().items(joiConfig.general._id.required()),
        },
    },
};

module.exports = joiSchema;