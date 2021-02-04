const User = require('../models/user');
const { APIError } = require('../helpers/error');

async function checkEditUser(req, res, next) {
    try {
        const { email } = req.jwtDecoded.data;
        const { username } = req.body;
        const user = await User.findOne({ username: username });
        if (user != null && user.email != email) {
            throw new APIError({ message: 'Username has has been exits' });
        }
        next();
    } catch (error) {
        next(error);
    }
}

async function checkRegister(req, res, next) {
    try {
        const { email, username } = req.body;
        const isEmail = await User.findOne({ email: email });
        if (isEmail) throw new APIError({ message: 'The email has been exits' });
        const isUsername = await User.findOne({ username: username });
        if (isUsername)
            throw new APIError({ message: 'The username has been exits' });
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { checkEditUser, checkRegister };