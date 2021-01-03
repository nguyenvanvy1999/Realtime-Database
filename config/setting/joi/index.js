let joi = require('joi');

const signUpSchema = joi.object({
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'vn'] },
        })
        .required(),
    username: joi.string().alphanum().min(4).max(30).required(),
    password: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(4)
        .required(),
});
const signInSchema = joi.object({
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'vn'] },
        })
        .required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: joi.string().valid('Admin', 'User'),
});
const tokenSchema = joi.object({
    token: joi
        .string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    refresh_token: joi
        .string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),
});
module.exports = {
    signInSchema: signInSchema,
    signUpSchema: signUpSchema,
    tokenSchema: tokenSchema,
};