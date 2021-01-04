const User = require('./../models/user');
const mongoose = require('mongoose');

// ________________________________________________
function newUser(email, username, password) {
    newUser = {
        _id: mongoose.Types.ObjectId(),
        email: email,
        username: username,
        password: password,
        isActive: false,
    };
    return newUser;
}
async function insert(newUser) {
    try {
        const user = new User(newUser);
        const result = await user.save();
        return result;
    } catch (error) {
        return error;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        return error;
    }
}
async function getAllUser() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        return error;
    }
}

async function editUser(email, newUsername, newPassword) {
    try {
        const user = await User.findOneAndUpdate({ email: email }, { username: newUsername, password: newPassword }, { new: true });
        return user;
    } catch (error) {
        return error;
    }
}

async function deleteUserByEmail(email) {
    try {
        const result = await User.findOneAndDelete({ email: email });
        return result;
    } catch (error) {
        return error;
    }
}

async function activeAccount(email) {
    try {
        const result = await User.findOneAndUpdate({ email: email }, { isActive: true }, { new: true });
        return result;
    } catch (error) {
        return error;
    }
}
// ________________________________________________
module.exports = {
    newUser: newUser,
    insert: insert,
    getUserByEmail: getUserByEmail,
    getAllUser: getAllUser,
    editUser: editUser,
    deleteUserByEmail: deleteUserByEmail,
    activeAccount: activeAccount,
};