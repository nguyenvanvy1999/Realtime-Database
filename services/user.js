const User = require('./../models/user'),
    mongoose = require('mongoose'),
    { APIError } = require('../helpers/error');
// ________________________________________________
function newUser(user) {
    try {
        newUser = {
            _id: mongoose.Types.ObjectId(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            isActive: false,
        };
        return newUser;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
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

async function editUser(email, firstName, lastName, newPassword) {
    try {
        return await User.findOneAndUpdate({ email: email }, { firstName: firstName, lastName: lastName, password: newPassword }, { new: true });
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
        //FIXME:error
        if (user.email && user.username)
            return await User.find({
                $and: [
                    { email: { $regex: user.email, $options: 'i' } },
                    { username: { $regex: user.username, $options: 'i' } },
                ],
            });
        if (user.email) return await User.find({ email: { $regex: user.email, $options: 'i' } });
        if (user.username)
            return await User.find({
                username: { $regex: user.username, $options: 'i' },
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