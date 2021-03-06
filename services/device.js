const Device = require('../models/device'),
    { APIError } = require('../helpers/error'),
    mongoose = require('mongoose');
async function getDeviceAdmin(device) {
    try {
        return await Device.find(device);
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function getDeviceUser(user, device) {
    try {
        const _id = mongoose.Types.ObjectId(user);
        const { model, type, deviceID } = device;
        const name = device.name || '';
        return await Device.find({
            $and: [
                { user: _id },
                { model: model },
                { type: type },
                { deviceID: deviceID },
                { name: { $regex: name, $options: 'i' } },
            ],
        });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function link(user, deviceID) {
    try {
        if (device.length === 1) return await Device.findOneAndUpdate({ deviceID }, { user }, { new: true });
        return await Device.updateMany({ deviceID }, { user }, { new: true });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function unLink(deviceID) {
    try {
        if (device.length === 1) {
            return await Device.findOneAndUpdate({ deviceID }, { user: null }, { new: true });
        }
        return await Device.updateMany({ deviceID }, { user: null }, { new: true });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = { getDeviceUser, getDeviceAdmin, link, unLink };