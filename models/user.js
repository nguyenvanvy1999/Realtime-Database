const mongoose = require('mongoose');
const isEmail = require('validator').isEmail;
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        validate: { validator: isEmail, message: 'Invalid email.' },
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [4, 'Password must be at least 4'],
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.pre('save', async function(next) {
    // Hash the password before saving the user model
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