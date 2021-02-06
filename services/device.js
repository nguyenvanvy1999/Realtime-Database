const Device = require('../models/device');
const { APIError } = require('../helpers/error');
const mongoose = require('mongoose');
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
async function linkDeviceWithUser(deviceID, userID) {
    try {
        return await Device.findOneAndUpdate({ deviceID: deviceID }, { user: userID }, { new: true });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function unLinkDevice(deviceID) {
    try {
        return await Device.findOneAndUpdate({ deviceID: deviceID }, { user: null }, { new: true });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function unLinkAllDevice(userID) {
    try {
        return await Device.updateMany({ user: userID }, { user: null }, { new: true });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = {
    getDeviceUser,
    linkDeviceWithUser,
    unLinkDevice,
    unLinkAllDevice,
    getDeviceAdmin,
};