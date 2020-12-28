const User = require('../models/user');
const { APIError } = require('../helpers/ErrorHandler');
async function validateEmail(email) {
    let user = await User.findOne({ email: email });
    return user ? false : true;
}
async function validateUsername(username) {
    let user = await User.findOne({ username: username });
    return user ? false : true;
}
async function checkDuplicateUsernameOrEmail(req, res, next) {
    try {
        let checkEmail = await validateEmail(req.body.email);
        if (!checkEmail) {
            throw new APIError({ message: 'Failed! Email is already in use!' });
        }
        let checkUsername = await validateUsername(req.body.username);
        if (!checkUsername) {
            throw new APIError({ message: 'Failed! Username is already in use!' });
        }
        next();
    } catch (error) {
        next(error);
    }
}

function checkRolesExisted(req, res, next) {}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
};
module.exports = verifySignUp;