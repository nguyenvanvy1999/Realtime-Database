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

async function search(user) {
    try {
        const { firstName, lastName, email } = user;
        if (email) return await User.find({ email: { $regex: email, $option: 'i' } });
        return await User.find({
            $and: [{ firstName: { $regex: firstName, $option: 'i' } }, { lastName: { $regex: lastName, $option: 'i' } }],
        });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

// ________________________________________________
module.exports = { newUser, insert, search };