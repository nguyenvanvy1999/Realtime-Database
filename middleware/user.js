const User = require('../models/user'),
    { APIError } = require('../helpers/error');

async function checkRegister(req, res, next) {
    try {
        const { email } = req.body;
        const isEmail = await User.findOne({ email: email });
        if (isEmail) throw new APIError({ message: 'The email has been exits' });
        next();
    } catch (error) {
        next(error);
    }
}

async function checkRole(req, res, next) {
    try {
        const { roles } = req.user;
        if (roles != 'Admin') throw new APIError({ message: 'No permission' });
        next();
    } catch (error) {
        next(error);
    }
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    next(new APIError({ message: 'Please login' }));
}
module.exports = { checkRegister, checkRole, isAuth };