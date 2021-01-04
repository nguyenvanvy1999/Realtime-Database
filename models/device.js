const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    deviceID: String,
    name: String,
    model: String,
    info: {
        type: Schema.Types.Mixed,
    },
    type: {
        // likes camera,...
        type: Schema.Types.Mixed,
    },
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;