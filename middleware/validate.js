const celebrateSchema = require('../config/setting/joi/index'),
    { APIError } = require('../helpers/error'),
    { celebrate } = require('celebrate');
//FIXME:

const Celebrate = {
    user: {
        login: celebrate(celebrateSchema.user.login),
        signup: celebrate(celebrateSchema.user.signup),
        editProfile: celebrate(celebrateSchema.user.editProfile),
        editPassword: celebrate(celebrateSchema.user.editPassword),
        forgotPassword: celebrate(celebrateSchema.user.forgotPassword),
        token: celebrate(celebrateSchema.user.token),
        search: celebrate(celebrateSchema.user.search),
    },
    device: {
        getDevice: celebrate(celebrateSchema.device.getDevice),
        deviceID: celebrate(celebrateSchema.device.deviceID),
    },
    zone: {
        newZone: celebrate(celebrateSchema.zone.newZone),
        one: celebrate(celebrateSchema.zone.one),
        many: celebrate(celebrateSchema.zone.many),
    },
};

module.exports = Celebrate;