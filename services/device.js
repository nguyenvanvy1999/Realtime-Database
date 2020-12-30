const Device = require('../models/device');

function getDevice(deviceID) {
    return new Promise((resolve, reject) => {
        try {
            const device = Device.findOne({ deviceID: deviceID });
            return resolve(device);
        } catch (error) {
            return reject(error);
        }
    });
}

function getAllDeviceSameType(type) {
    //get all devices likes camera,sensor,... by device type
    return new Promise((resolve, reject) => {
        try {
            const devices = Device.find({ type: type });
            return resolve(devices);
        } catch (error) {
            return reject(error);
        }
    });
}

function getAllDevice() {
    return new Promise((resolve, reject) => {
        try {
            const devices = Device.find();
            return resolve(devices);
        } catch (error) {
            return reject(error);
        }
    });
}

function getDeviceUser(userID) {
    return new Promise((resolve, reject) => {
        try {
            const devices = Device.find({ user: userID });
            return resolve(devices);
        } catch (error) {
            return reject(error);
        }
    });
}

function getDeviceUserAndType(userID, type) {
    return new Promise((resolve, reject) => {
        try {
            const devices = Device.find({ user: userID }, { type: type });
            return resolve(devices);
        } catch (error) {
            return reject(error);
        }
    });
}

function linkDeviceWithUser(deviceID, userID) {
    return new Promise((resolve, reject) => {
        try {
            const result = Device.findOneAndUpdate({ deviceID: deviceID }, { user: userID }, { new: true });
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

function unLinkDevice(deviceID) {
    return new Promise((resolve, reject) => {
        try {
            const result = Device.findOneAndUpdate({ deviceID: deviceID }, { user: null }, { new: true });
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

function unLinkAllDevice(userID) {
    return new Promise((resolve, reject) => {
        try {
            const result = Device.updateMany({ user: userID }, { user: null }, { new: true });
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}
module.exports = {
    getDevice: getDevice,
    getAllDevice: getAllDevice,
    getAllDeviceSameType: getAllDeviceSameType,
    getDeviceUser: getDeviceUser,
    getDeviceUserAndType: getDeviceUserAndType,
    linkDeviceWithUser: linkDeviceWithUser,
    unLinkDevice: unLinkDevice,
    unLinkAllDevice: unLinkAllDevice,
};