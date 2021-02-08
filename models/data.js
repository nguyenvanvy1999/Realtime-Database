const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const dataSchema = new Schema({
    _id: ObjectId,
    user: { type: ObjectId, ref: 'User' },
    device: { type: ObjectId, ref: 'Device' },
    time: { type: Date, default: Date.now() },
    data: [{ type: Schema.Types.Mixed }],
}, { timestamps: true });

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;