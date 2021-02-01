const Device = require('../models/device');

async function getDevice(deviceID) {
    try {
        const device = await Device.findOne({ deviceID: deviceID });
        return device;
    } catch (error) {
        return error;
    }
}

async function getAllDeviceSameType(type) {
    //get all devices likes camera,sensor,... by device type

    try {
        const devices = await Device.find({ type: type });
        return devices;
    } catch (error) {
        return error;
    }
}

async function getAllDevice() {
    try {
        const devices = await Device.find();
        return devices;
    } catch (error) {
        return error;
    }
}

async function getDeviceUser(userID) {
    try {
        const devices = await Device.find({ user: userID });
        return devices;
    } catch (error) {
        return error;
    }
}

async function getDeviceUserAndType(userID, type) {
    try {
        const devices = await Device.find({ user: userID }, { type: type });
        return devices;
    } catch (error) {
        return error;
    }
}

async function linkDeviceWithUser(deviceID, userID) {
    try {
        const result = await Device.findOneAndUpdate({ deviceID: deviceID }, { user: userID }, { new: true });
        return result;
    } catch (error) {
        return error;
    }
}

async function unLinkDevice(deviceID) {
    try {
        const result = await Device.findOneAndUpdate({ deviceID: deviceID }, { user: null }, { new: true });
        return result;
    } catch (error) {
        return error;
    }
}

async function unLinkAllDevice(userID) {
    try {
        const result = await Device.updateMany({ user: userID }, { user: null }, { new: true });
        return result;
    } catch (error) {
        return error;
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