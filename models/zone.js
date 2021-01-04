const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zoneSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
}, { timestamps: true });

const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone;