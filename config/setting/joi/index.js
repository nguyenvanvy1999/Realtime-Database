//const joi = require('joi');
const joi = require('joi-oid');
const Joi = require('joi');
const signUpSchema = joi.object({
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'vn'] },
        })
        .required(),
    username: joi.string().alphanum().min(4).max(30).required(),
    password: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(4)
        .required(),
});
const signInSchema = joi.object({
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'vn'] },
        })
        .required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: joi.string().valid('Admin', 'User'),
});
const editUserSchema = joi.object({
    newUsername: joi.string().alphanum().min(4).max(30).required(),
    newPassword: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(4)
        .required(),
});
const tokenSchema = joi.object({
    token: joi
        .string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    refresh_token: joi
        .string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),
});
const deviceIDSchema = joi.object({
    deviceID: joi.objectId(),
});
const deviceTypeSchema = joi.object({
    type: joi.string().required(),
});
const zoneSchema = joi.object({
    zone: joi.objectId().required(),
});
const devicesIDSchema = joi
    .array()
    .items(
        joi.object({
            deviceID: joi.objectId(),
        })
    )
    .required();
module.exports = {
    signInSchema: signInSchema,
    signUpSchema: signUpSchema,
    tokenSchema: tokenSchema,
    deviceIDSchema: deviceIDSchema,
    devicesIDSchema: devicesIDSchema,
    deviceTypeSchema: deviceTypeSchema,
    zoneSchema: zoneSchema,
    editUserSchema: editUserSchema,
};