const Data = require("../models/data");
const mongoose = require("mongoose");

function newData(socket, document) {
    const newData = {
        user: document.user,
        time: Date.now(),
        socket: {
            id: socket.id,
            device: "win10",
            address: socket.handshake.address,
        },
        data: {
            data: document.data,
            time: socket.handshake.time,
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

function getData(user) {
    return new Promise((resolve, reject) => {
        try {
            const dataDocuments = Data.find({ user: user });
            return resolve(dataDocuments);
        } catch (error) {
            return reject(error);
        }
    });
}

function getAllData() {
    return new Promise((resolve, reject) => {
        try {
            const dataDocuments = Data.find();
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
    newData,
    insert,
    getData,
    getAllData,
    deleteData,
};