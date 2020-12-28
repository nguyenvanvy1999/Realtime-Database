const User = require('../models/user');
const { APIError } = require('../helpers/ErrorHandler');

function checkUsernameAndPassword(req, res, next) {
    try {
        const { email, newUsername, newPassword } = req.body;
        if (newPassword.length < 4) {
            throw new APIError({ message: 'Password must be >= 4 character' });
        }
        User.findOne({ username: newUsername }).then((user) => {
            if (user != null && user.email != email) {
                throw new APIError({ message: 'Username has been used' });
            } else {
                next();
            }
        });
    } catch (error) {
        next(error);
    }
}
module.exports = { checkUsernameAndPassword };