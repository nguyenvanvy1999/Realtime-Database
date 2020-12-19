const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    user: String,
    time: {
        type: Date,
        default: Date.now(),
    },
    socket: {
        id: String,
        device: String,
        address: String,
    },
    data: {
        data: String,
        time: String,
    },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;