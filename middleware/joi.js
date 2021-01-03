const { func } = require('joi');
const JoiSchema = require('../config/setting/joi/index');
const { APIError } = require('../helpers/ErrorHandler');
async function joiSignUp(req, res, next) {
    try {
        const { result, error } = JoiSchema.signUpSchema.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}

async function joiSignIn(req, res, next) {
    try {
        const { result, error } = JoiSchema.signInSchema.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}
async function joiToken(req, res, next) {
    try {
        const { result, error } = JoiSchema.tokenSchema.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    joiSignIn: joiSignIn,
    joiSignUp: joiSignUp,
    joiToken: joiToken,
};