const joi = require('joi');
const Joi = require('joi-oid');

const email = joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .required();
const username = joi.string().alphanum().min(4).max(30).required();
const password = joi
    .string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(4)
    .required();
const role = joi.string().valid('Admin', 'User');
const newUsername = joi.string().alphanum().min(4).max(30).required();
const newPassword = joi
    .string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(4)
    .required();
const token = joi
    .string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required();
const refresh_token = joi
    .string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required();
const deviceID = Joi.objectId().required();
const deviceType = joi.string().required();
const description = joi.string();
const name = joi.string().required();
const zoneID = Joi.objectId().required();
module.exports = {
    email: email,
    username: username,
    password: password,
    role: role,
    newUsername: newUsername,
    newPassword: newPassword,
    token: token,
    refresh_token: refresh_token,
    deviceID: deviceID,
    deviceType: deviceType,
    zoneID: zoneID,
    name: name,
    description: description,
};