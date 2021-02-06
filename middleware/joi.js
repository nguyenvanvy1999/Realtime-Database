const joiSchema = require('../config/setting/joi/index');
const { APIError } = require('../helpers/error');
const JoiValidate = {
    user: {
        signUp: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.user.signUpSchema.validate(
                    req.body
                );
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
        signIn: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.user.signInSchema.validate(
                    req.body
                );
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
        token: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.user.tokenSchema.validate(req);
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
        editUser: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.user.editUserSchema.validate(
                    req.body
                );
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
    },
    device: {
        getDevice: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.device.getDevice.validate(req);
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
        deviceID: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.device.deviceID.validate(req.body);
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
    },
    zone: {
        newZone: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.zone.newZone.validate(req.body);
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
        one: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.zone.one.validate(req.body);
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
        many: async(req, res, next) => {
            try {
                const { result, error } = joiSchema.zone.many.validate(req.body);
                if (error)
                    throw new APIError({ message: error.message, errors: error });
                next();
            } catch (error) {
                next(error);
            }
        },
    },
};

module.exports = JoiValidate;