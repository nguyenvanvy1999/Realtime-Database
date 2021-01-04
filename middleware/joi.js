const Joi = require('joi');
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
async function joiDevice(req, res, next) {
    try {
        const { result, error } = JoiSchema.deviceIDSchema.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}
async function joiDevices(req, res, next) {
    try {
        const { result, error } = JoiSchema.devicesIDSchema.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}
async function joiDeviceType(req, res, next) {
    try {
        const { result, error } = JoiSchema.deviceTypeSchema.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}
async function joiZone(req, res, next) {
    try {
        const { result, error } = JoiSchema.zoneSchema.validate(req.body);
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
    joiDevice: joiDevice,
    joiDeviceType: joiDeviceType,
    joiDevices: joiDevices,
    joiZone: joiZone,
};