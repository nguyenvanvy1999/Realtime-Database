const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: 'Device',
    },
    time: {
        type: Date,
        default: Date.now(),
    },
    data: [{
        data: {
            type: Schema.Types.Mixed,
        },
        time: String,
    }, ],
}, { timestamps: true });

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;