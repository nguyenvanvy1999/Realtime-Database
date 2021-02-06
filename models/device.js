const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    deviceID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    info: { type: Schema.Types.Mixed },
    type: { type: Schema.Types.Mixed },
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;