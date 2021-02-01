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
        tokenSchema: joi.object({
            token: joiConfig.user.token,
        }),
    },
    device: {
        deviceID: joiConfig.general._id,
        tokenAndDeviceID: joi.object({
            token: joiConfig.user.token,
            deviceID: joiConfig.general._id,
        }),
        tokenAndType: joi.object({
            token: joiConfig.user.token,
            type: joiConfig.general.string,
        }),
        type: joiConfig.general.string,
    },
    zone: {
        newZone: {
            token: joiConfig.user.token,
            description: joiConfig.general.string,
            name: joiConfig.general.string,
            deviceID: joiConfig.general._id,
        },
        one: {
            zoneID: joiConfig.general._id,
            deviceID: joiConfig.general._id,
        },
        many: {
            zoneID: joiConfig.general._id,
            devicesID: joi.array().items(joiConfig.general._id),
        },
    },
};

module.exports = joiSchema;