const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    bcrypt = require('bcrypt'),
    bcryptConfig = require('../config/constant/bcrypt');

const userSchema = new Schema({
    _id: ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, min: 4 },
    roles: {
        type: String,
        apply: ['User', 'Admin'],
        default: 'User',
        required: true,
    },
    isActive: { type: Boolean, default: false },
}, { timestamps: true }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, bcryptConfig.saltRound);
    }
    next();
});
userSchema.pre('remove', async function(next) {
    const user = this;
    user.model('Data').deleteMany({ user: this._id });
    next();
});

userSchema.methods.comparePassword = async function comparePassword(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;