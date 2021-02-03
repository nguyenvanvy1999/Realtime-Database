const User = require('../models/user');
const { APIError } = require('../helpers/error');

async function checkUsernameAndPassword(req, res, next) {
    try {
        const { email, username } = req.body;
        const user = await User.findOne({ username: username });
        if (user != null && user.email != email) {
            throw new APIError({ message: 'Username has been used' });
        }
        next();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function checkDuplicateEmail(req, res, next) {
    try {
        const user = await User.findOne({ email: req.email });
        if (user) throw new APIError({ message: 'The email has been exits' });
        next();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = { checkDuplicateEmail, checkUsernameAndPassword };