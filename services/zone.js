const Zone = require('../models/zone'),
    mongoose = require('mongoose'),
    { APIError } = require('../helpers/error');

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

module.exports = { newZone, insert };