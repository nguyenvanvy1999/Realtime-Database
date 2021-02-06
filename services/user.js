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
        roles: user.roles,
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
async function search(user) {
    try {
        const email = user.email || '';
        const username = user.username || '';
        return User.find({
            $and: [
                { email: { $regex: email, $options: 'i' } },
                { username: { $regex: username, $options: 'i' } },
            ],
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
    editUser,
    deleteUserByEmail,
    activeAccount,
    search,
};