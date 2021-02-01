const User = require('../models/user');
const { APIError } = require('../helpers/ErrorHandler');

async function checkUsernameAndPassword(req, res, next) {
    try {
        const { email, newUsername } = req.body;
        const user = await User.findOne({ username: newUsername }); //FIXME:
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
        const user = await User.findOne(req.email); //FIXME:
        if (user) throw new APIError({ message: 'The email has been exits' });
        next();
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = { checkDuplicateEmail, checkUsernameAndPassword };