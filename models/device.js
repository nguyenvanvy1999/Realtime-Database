const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    deviceID: String,
    name: String,
    model: String,
    info: {
        type: Schema.Types.Mixed,
    },
    type: {
        type: Schema.Types.Mixed,
    },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;