const User = require('../models/user');
const { APIError } = require('../helpers/ErrorHandler');

async function checkUsernameAndPassword(req, res, next) {
    try {
        const { email, newUsername } = req.body;
        const user = await User.findOne({ username: newUsername });
        if (user != null && user.email != email) {
            throw new APIError({ message: 'Username has been used' });
        }
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = { checkUsernameAndPassword };