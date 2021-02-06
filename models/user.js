const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, min: 4 },
    roles: {
        type: String,
        apply: ['User', 'Admin'],
        default: 'User',
        required: true,
    },
    isActive: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
userSchema.pre('remove', async function(next) {
    const user = this;
    user.model('Data').deleteMany({ user: this._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;