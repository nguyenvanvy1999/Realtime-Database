const { func } = require('joi');
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
async function joiEdit(req, res, next) {
    try {
        const { result, error } = JoiSchema.editUserSchema.validate(req.body);
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
// ___________________________________________________________
async function joiDeviceID(req, res, next) {
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
async function joiDeviceIDAndUser(req, res, next) {
    try {
        const { result, error } = JoiSchema.deviceIDAndUserSchema.validate(
            req.body
        );
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}
async function joiDeviceTypeAndUser(req, res, next) {
    try {
        const { result, error } = JoiSchema.deviceTypeAndUserSchema.validate(
            req.body
        );
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
// ___________________________________________________________
async function joiNewZone(req, res, next) {
    try {
        const { result, error } = JoiSchema.newZoneSchema.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}
async function joiZoneIDAndDeviceID(req, res, next) {
    try {
        const { result, error } = JoiSchema.zoneIDAndDeviceID.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}

async function joiZoneIDAndDevicesID(req, res, next) {
    try {
        const { result, error } = JoiSchema.zoneIDAndDevicesID.validate(req.body);
        if (!error) {
            next();
        } else {
            throw new APIError({ message: error.message });
        }
    } catch (error) {
        next(error);
    }
}

// ___________________________________________________________

module.exports = {
    joiSignIn: joiSignIn,
    joiSignUp: joiSignUp,
    joiToken: joiToken,
    joiDeviceType: joiDeviceType,
    joiEdit: joiEdit,
    joiDeviceIDAndUser: joiDeviceIDAndUser,
    joiDeviceID: joiDeviceID,
    joiDeviceTypeAndUser: joiDeviceTypeAndUser,
    joiNewZone: joiNewZone,
    joiZoneIDAndDeviceID: joiZoneIDAndDeviceID,
    joiZoneIDAndDevicesID: joiZoneIDAndDevicesID,
};