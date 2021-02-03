const Data = require('../models/data');
const mongoose = require('mongoose');
const { APIError } = require('../helpers/error');

function newData(socket, document) {
    newData = {
        _id: mongoose.Types.ObjectId(),
        user: document.user,
        device: document.device,
        time: Date.now(),
        data: {
            socket: {
                id: socket.id,
                address: socket.handshake.address,
            },
            time: socket.handshake.time,
            data: document.data,
        },
    };
    return newData;
}

async function insert(newData) {
    try {
        const data = new Data(newData);
        return await data.save();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getDataByDevice(deviceID) {
    try {
        return await Data.find({ device: deviceID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getDataByUser(userID) {
    try {
        return await Data.find({ user: userID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function deleteOneData(id) {
    try {
        return await Data.findByIdAndDelete(id);
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function deleteDataByUser(userID) {
    try {
        return await Data.deleteMany({ user: userID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function deleteDataByDevice(deviceID) {
    try {
        return await Data.deleteMany({ device: deviceID });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = {
    newData,
    insert,
    getDataByDevice,
    getDataByUser,
    deleteOneData,
    deleteDataByDevice,
    deleteDataByUser,
};