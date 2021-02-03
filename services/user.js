const User = require('./../models/user');
const mongoose = require('mongoose');
const { APIError } = require('../helpers/error');
// ________________________________________________
function newUser(user) {
    newUser = {
        _id: mongoose.Types.ObjectId(),
        email: user.email,
        username: user.username,
        password: user.password,
        isActive: false,
    };
    return newUser;
}
async function insert(newUser) {
    try {
        const user = new User(newUser);
        return await user.save();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function getUserByEmail(email) {
    try {
        return await User.findOne({ email: email });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function getAllUser() {
    try {
        return await User.find();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function editUser(email, newUsername, newPassword) {
    try {
        return await User.findOneAndUpdate({ email: email }, { username: newUsername, password: newPassword }, { new: true });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function deleteUserByEmail(email) {
    try {
        return await User.findOneAndDelete({ email: email });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function user(user) {
    try {
        const { email, username, _id } = user;
        return await User.findOne({
            $and: [{ email: email }, { username: username }, { _id: _id }],
        });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function users(user) {
    try {
        if (user === null) return User.find();
        const { email, username, _id } = user;
        return User.findOne({
            $or: [{ email: email }, { username: username }, { _id: _id }],
        });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function activeAccount(email) {
    try {
        return await User.findOneAndUpdate({ email: email }, { isActive: true }, { new: true });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
// ________________________________________________
module.exports = {
    newUser,
    insert,
    getUserByEmail,
    getAllUser,
    editUser,
    deleteUserByEmail,
    activeAccount,
};