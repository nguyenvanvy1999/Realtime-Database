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
        const result = await data.save();
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getDataByDevice(deviceID) {
    try {
        const dataDocuments = await Data.find({ device: deviceID });
        return dataDocuments;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getDataByUser(userID) {
    try {
        const dataDocuments = await Data.find({ user: userID });
        return dataDocuments;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function deleteOneData(id) {
    try {
        const result = await Data.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function deleteDataByUser(userID) {
    try {
        let result = await Data.deleteMany({ user: userID });
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function deleteDataByDevice(deviceID) {
    try {
        let result = await Data.deleteMany({ device: deviceID });
        return result;
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