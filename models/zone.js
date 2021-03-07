const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const zoneSchema = new Schema({
    _id: ObjectId,
    name: String,
    description: String,
    user: { type: ObjectId, ref: 'User' },
    devices: [{ type: ObjectId, ref: 'Device' }],
}, { timestamps: true });

const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone;