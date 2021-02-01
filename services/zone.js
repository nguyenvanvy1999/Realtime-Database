const Zone = require('../models/zone');
const mongoose = require('mongoose');

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
        const result = await zone.save();
        return result;
    } catch (error) {
        return error;
    }
}
async function getZoneByUser(userID) {
    try {
        const zone = await Zone.findOne({ user: userID });
        return zone;
    } catch (error) {
        return error;
    }
}
async function getZoneByDevice(deviceID) {
    try {
        const zones = await Zone.find({ devices: { $all: [deviceID] } });
        return zones;
    } catch (error) {
        return error;
    }
}
async function deleteZone(zoneID) {
    try {
        const result = await Zone.findOneAndDelete({ _id: zoneID });
        return result;
    } catch (error) {
        return error;
    }
}
async function addDevice(zoneID, deviceID) {
    try {
        const result = await Zone.updateOne({ _id: zoneID }, { $push: { devices: deviceID } });
        return result;
    } catch (error) {
        return error;
    }
}
async function addManyDevices(zoneID, devicesID) {
    try {
        const result = await Zone.updateOne({ _id: zoneID }, { $push: { devices: { $each: devicesID } } });
        return result;
    } catch (error) {
        return error;
    }
}
async function removeDevice(zoneID, deviceID) {
    try {
        const result = await Zone.updateOne({ _id: zoneID }, { $pull: { devices: deviceID } });
        return result;
    } catch (error) {
        return error;
    }
}
async function removeManyDevices(zoneID, devicesID) {
    try {
        const result = await Zone.updateOne({ _id: zoneID }, { $pullAll: { devices: devicesID } });
        return result;
    } catch (error) {
        return error;
    }
}
async function deleteZone(zoneID) {
    try {
        const result = await Zone.findOneAndRemove({ _id: zoneID });
        return result;
    } catch (error) {
        return error;
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