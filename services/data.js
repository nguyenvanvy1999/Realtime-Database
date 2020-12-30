const Data = require('../models/data');
const mongoose = require('mongoose');

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

function insert(newData) {
    return new Promise((resolve, reject) => {
        try {
            const data = new Data(newData);
            const result = data.save();
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

function getDataByDevice(deviceID) {
    return new Promise((resolve, reject) => {
        try {
            const dataDocuments = Data.find({ device: deviceID });
            return resolve(dataDocuments);
        } catch (error) {
            return reject(error);
        }
    });
}

function getDataByUser(userID) {
    return new Promise((resolve, reject) => {
        try {
            const dataDocuments = Data.find({ user: userID });
            return resolve(dataDocuments);
        } catch (error) {
            return reject(error);
        }
    });
}

function deleteOneData(id) {
    return new Promise((resolve, reject) => {
        try {
            const result = Data.findByIdAndDelete(id);
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

function deleteDataByUser(userID) {
    return new Promise((resolve, reject) => {
        try {
            let result = Data.deleteMany({ user: userID });
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

function deleteDataByDevice(deviceID) {
    return new Promise((resolve, reject) => {
        try {
            let result = Data.deleteMany({ device: deviceID });
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    newData: newData,
    insert: insert,
    getDataByDevice: getDataByDevice,
    getDataByUser: getDataByUser,
    deleteOneData: deleteOneData,
    deleteDataByDevice: deleteDataByDevice,
    deleteDataByUser: deleteDataByUser,
};