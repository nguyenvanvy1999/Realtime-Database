const Device = require('../models/device');
const { APIError } = require('../helpers/error');
async function getDevice(deviceID) {
    try {
        return await Device.findOne({ deviceID: deviceID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getAllDeviceSameType(type) {
    //get all devices likes camera,sensor,... by device type

    try {
        return await Device.find({ type: type });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getAllDevice() {
    try {
        return await Device.find();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getDeviceUser(userID) {
    try {
        return await Device.find({ user: userID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getDeviceUserAndType(userID, type) {
    try {
        return await Device.find({ user: userID }, { type: type });
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
    getDevice,
    getAllDevice,
    getAllDeviceSameType,
    getDeviceUser,
    getDeviceUserAndType,
    linkDeviceWithUser,
    unLinkDevice,
    unLinkAllDevice,
};