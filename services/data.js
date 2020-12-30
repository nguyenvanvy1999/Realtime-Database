const Data = require('../models/data');
const mongoose = require('mongoose');

function newData(socket, document) {
    newData = {
        _id: mongoose.Types.ObjectId(),
        user: document.user,
        time: Date.now(),
        device: document.device,
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

function getDataDevice(device) {
    return new Promise((resolve, reject) => {
        try {
            const dataDocuments = Data.find({ device: device });
            return resolve(dataDocuments);
        } catch (error) {
            return reject(error);
        }
    });
}

function getDataUser(email) {
    return new Promise((resolve, reject) => {
        try {
            const dataDocuments = Data.find({ user: { email: email } });
            return resolve(dataDocuments);
        } catch (error) {
            return reject(error);
        }
    });
}

function deleteData(id) {
    return new Promise((resolve, reject) => {
        try {
            const result = Data.findByIdAndDelete(id);
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    newData: newData,
    insert: insert,
    getDataDevice: getDataDevice,
    getDataUser: getDataUser,
    deleteData: deleteData,
};