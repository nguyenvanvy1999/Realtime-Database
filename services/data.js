const Data = require("../models/data");
const mongoose = require("mongoose");

function newData(socket, document) {
    newData={
        _id: mongoose.Types.ObjectId(),
        user: document.user,
        time: Date.now(),
        socket: {
            id: socket.id,
            device: document.device,
            address: socket.handshake.address,
        },
        data: {
            time: socket.handshake.time,
            data: document.data,
        },
    }
    return newData;
}

function insert(newData) {
    return new Promise((resolve, reject) => {
        try {
            const data = new Data(newData)
            const result = data.save()
            return resolve(result)
        } catch (error) {
            return reject(error)
        }
    })
}

function getData (email) {
  return new Promise((resolve, reject) => {
  try {
            const dataDocuments = Data.find({ user: { email: email } });
            return resolve(dataDocuments);
        } catch (error) {
            return reject(error);
        }
    });
}

function getAllData(){
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
