const Zone = require('../models/zone');
const mongoose = require('mongoose');
const { APIError } = require('../helpers/error');

function newZone(userID, devicesID, name, description) {
    const newZone = {
        _id: mongoose.Schema.Types.ObjectId(),
        name: name,
        description: description,
        user: userID,
        devices: [],
    };
    devicesID.array.forEach((element) => {
        devices.push(element);
    });
    return newZone;
}

async function insert(newZone) {
    try {
        const zone = new Zone(newZone);
        return await zone.save();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function getZoneByUser(userID) {
    try {
        return await Zone.findOne({ user: userID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function getZoneByDevice(deviceID) {
    try {
        return await Zone.find({ devices: { $all: [deviceID] } });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function deleteZone(zoneID) {
    try {
        return await Zone.findOneAndDelete({ _id: zoneID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function addDevice(zoneID, deviceID) {
    try {
        return await Zone.updateOne({ _id: zoneID }, { $push: { devices: deviceID } });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function addManyDevices(zoneID, devicesID) {
    try {
        return await Zone.updateOne({ _id: zoneID }, { $push: { devices: { $each: devicesID } } });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function removeDevice(zoneID, deviceID) {
    try {
        return await Zone.updateOne({ _id: zoneID }, { $pull: { devices: deviceID } });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function removeManyDevices(zoneID, devicesID) {
    try {
        return await Zone.updateOne({ _id: zoneID }, { $pullAll: { devices: devicesID } });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function deleteZone(zoneID) {
    try {
        return await Zone.findOneAndRemove({ _id: zoneID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
module.exports = {
    newZone,
    insert,
    getZoneByDevice,
    getZoneByUser,
    addDevice,
    addManyDevices,
    removeDevice,
    removeManyDevices,
    deleteZone,
};