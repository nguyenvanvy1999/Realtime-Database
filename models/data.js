const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.Mixed,
    },
    time: {
        type: Date,
        default: Date.now(),
    },
    socket: {
        type: Schema.Types.Mixed,
    },
    data: {
        data: {
            type: Schema.Types.Mixed,
        },
        time: String,
    },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;