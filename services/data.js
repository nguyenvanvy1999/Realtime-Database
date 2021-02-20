const Data = require('../models/data'),
    mongoose = require('mongoose'),
    { APIError } = require('../helpers/error');

function newData(socket, document) {
    return {
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
}

function newFileData(user, files) {
    return {
        _id: mongoose.Types.ObjectId(),
        user: user,
        device: null,
        data: files,
    };
}

async function insert(newData) {
    try {
        const data = new Data(newData);
        return await data.save();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = { newData, newFileData, insert };