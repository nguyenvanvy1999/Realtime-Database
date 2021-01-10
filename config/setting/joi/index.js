//const joi = require('joi');
const joi = require('joi-oid');
const Joi = require('joi');
const joiSchema = require('../../constant/joi');

const signUpSchema = joi.object({
    email: joiSchema.email,
    username: joiSchema.username,
    password: joiSchema.password,
});
const signInSchema = joi.object({
    email: joiSchema.email,
    password: joiSchema.password,
});
const editUserSchema = joi.object({
    toke: joiSchema.token,
    newUsername: joiSchema.newUsername,
    newPassword: joiSchema.newPassword,
});
const tokenSchema = joi.object({
    token: joiSchema.token,
});

const deviceIDSchema = joi.object({
    deviceID: joiSchema.deviceID,
});
const deviceIDAndUserSchema = joi.object({
    token: joiSchema.token,
    deviceID: joiSchema.deviceID,
});
const deviceTypeAndUserSchema = joi.object({
    token: joiSchema.token,
    type: joiSchema.deviceType,
});
const deviceTypeSchema = joi.object({
    type: joiSchema.deviceType,
});

const newZoneSchema = joi.object({
    token: joiSchema.token,
    deviceID: joiSchema.deviceID,
    name: joiSchema.name,
    description: joiSchema.description,
});
const zoneIDAndDeviceID = joi.object({
    zoneID: joiSchema.zoneID,
    deviceID: joiSchema.deviceID,
});
const zoneIDAndDevicesID = joi.object({
    zoneID: joiSchema.zoneID,
    devicesID: joi.array().items(joiSchema.deviceID),
});
module.exports = {
    signInSchema: signInSchema,
    signUpSchema: signUpSchema,
    tokenSchema: tokenSchema,
    deviceIDSchema: deviceIDSchema,
    deviceTypeSchema: deviceTypeSchema,
    editUserSchema: editUserSchema,
    deviceIDAndUserSchema: deviceIDAndUserSchema,
    deviceTypeAndUserSchema: deviceTypeAndUserSchema,
    newZoneSchema: newZoneSchema,
    zoneIDAndDeviceID: zoneIDAndDeviceID,
    zoneIDAndDevicesID: zoneIDAndDevicesID,
};