const UserService = require('./../services/user.js');
const User = require('../models/user');
const jwtHelper = require('../helpers/jwt');
const { APIError } = require('../helpers/ErrorHandler');
const bcryptHelper = require('../helpers/bcrypt');
const HTTP_STATUS_CODE = require('../config/constant/http');
const mailHelper = require('../helpers/mailer');
const jwtConfig = require('../config/constant/jwt');
const mailConfig = require('../config/constant/mail').mailConfig;
const mailOption = require('../config/constant/mail').mailOption;
// ________________________________________________
async function signUp(req, res, next) {
    try {
        const { email, username, password } = req.body;
        let newUser = UserService.newUser(email, username, password);
        let user = await UserService.insert(newUser);
        let token = await jwtHelper.generateToken(
            user,
            jwtConfig.verifySecret,
            jwtConfig.verifyLife
        );
        let text = {
            message: mailOption.text,
            token: token,
        };
        let newMail = mailHelper.newMailOption(
            mailConfig.auth.user,
            email,
            mailOption.subject,
            text
        );
        let result = await mailHelper.sendMail(newMail);
        res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Check your email and verify account!', result });
    } catch (error) {
        next(error);
    }
}
async function verifyAccount(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        let decoded = await jwtHelper.verifyToken(token, jwtConfig.verifySecret);
        let result = await UserService.activeAccount(decoded.data.email);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Active successfully !.Now you can using out function',
            result,
        });
    } catch (error) {
        next(error);
    }
}
async function signIn(req, res, next) {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res
                .status(HTTP_STATUS_CODE.ERROR.NOT_FOUND)
                .send({ error: 'Email was wrong' });
        } else {
            const checkPass = await bcryptHelper.compare(password, user.password);
            if (checkPass === false) {
                res
                    .status(HTTP_STATUS_CODE.ERROR.UNAUTHORIZED)
                    .send({ error: 'Password was wrong' });
            } else {
                const token = await jwtHelper.returnToken(user);
                return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(token);
            }
        }
    } catch (error) {
        next(error);
    }
}

async function getAllUser(req, res, next) {
    try {
        const users = await UserService.getAllUser();
        if (users.length === 0) {
            return res
                .status(HTTP_STATUS_CODE.SUCCESS.OK)
                .send({ message: 'No user found' });
        } else {
            return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
                count: users.length,
                users: users,
            });
        }
    } catch (error) {
        next(error);
    }
}

async function editUser(req, res, next) {
    try {
        let { email, newUsername, newPassword } = req.body;
        newPassword = await bcryptHelper.hash(newPassword, 8);
        const newUser = await UserService.editUser(email, newUsername, newPassword);
        const token = await jwtHelper.returnToken(newUser);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ token, newUser });
    } catch (error) {
        next(error);
    }
}
async function deleteUser(req, res, next) {
    try {
        const email = req.body.email || req.jwtDecoded.data.email;
        console.log(email);
        UserService.deleteUserByEmail(email);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send('Delete Successfully!');
    } catch (error) {
        next(error);
    }
}
async function getUserProfile(req, res, next) {
    try {
        const email = req.jwtDecoded.data.email;
        const user = await UserService.getUserByEmail(email);
        if (user === null) {
            throw new APIError({ message: 'Not Found User' });
        } else {
            return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(user);
        }
    } catch (error) {
        next(error);
    }
}

async function refreshToken(req, res, next) {
    try {
        const refreshToken =
            req.body.refreshToken ||
            req.query.refreshToken ||
            req.header['refreshToken'];
        if (refreshToken) {
            const decoded = await jwtHelper.verifyToken(
                refreshToken,
                jwtConfig.refreshSecret
            );
            const accessToken = await jwtHelper.generateToken(
                decoded.data,
                jwtConfig.accessSecret,
                jwtConfig.accessLife
            );
            return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        } else {
            return res.status(HTTP_STATUS_CODE.ERROR.UNAUTHORIZED).send({
                message: 'No token provided.',
            });
        }
    } catch (error) {
        next(error);
    }
}
// ________________________________________________
module.exports = {
    signUp: signUp,
    signIn: signIn,
    getAllUser: getAllUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getUserProfile: getUserProfile,
    refreshToken: refreshToken,
    verifyAccount: verifyAccount,
};