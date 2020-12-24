const mongoose = require('mongoose');
const validator = require('validator');
const isEmail = require('validator').isEmail;
const bcrypt = require('bcryptjs');
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
});

userSchema.pre('save', async function(next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;