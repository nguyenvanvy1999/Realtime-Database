const UserService = require('./../services/user.js'),
    jwtHelper = require('../helpers/jwt'),
    { APIError } = require('../helpers/error'),
    bcryptHelper = require('../helpers/bcrypt'),
    HTTP_STATUS_CODE = require('../config/constant/http'),
    { sendMail, verifyEmail, resetPasswordMail } = require('../helpers/mailer'),
    jwtConfig = require('../config/constant/jwt'),
    User = require('../models/user');
// ________________________________________________

async function postSignIn(req, res, next) {
    try {
        const user = req.user;
        const token = await jwtHelper.returnToken(user);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(token);
    } catch (error) {
        next(error);
    }
}

async function postSignUp(req, res, next) {
    try {
        const newUser = UserService.newUser(req.body);
        const token = await jwtHelper.generateToken(newUser, jwtConfig.VERIFY.SECRET, jwtConfig.VERIFY.LIFE);
        await UserService.insert(newUser);
        const config = verifyEmail(token, req);
        await sendMail(config);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Check your email and verify account!' });
    } catch (error) {
        next(error);
    }
}
async function verifyAccount(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        const decoded = await jwtHelper.verifyToken(token, jwtConfig.VERIFY.SECRET);
        await User.findOneAndUpdate({ email: decoded.data.email }, { isActive: true });
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Active successfully !' });
    } catch (error) {
        next(error);
    }
}

async function editUserProfile(req, res, next) {
    try {
        const { email } = req.user;
        const { firstName, lastName } = req.body;
        const newUser = await User.findOneAndUpdate({ email }, { firstName, lastName }, { new: true });
        const token = await jwtHelper.returnToken(newUser);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ token });
    } catch (error) {
        next(error);
    }
}

async function editPassword(req, res, next) {
    try {
        const { email } = req.user;
        let { password } = req.body;
        const user = await User.findOne({ email });
        const isExits = await bcryptHelper.compare(password, user.password); //check new password has been change?
        if (isExits) throw new APIError({ message: 'Password has exits.Please choose new password' });
        password = await bcryptHelper.hash(password);
        await User.findOneAndUpdate({ email }, { password });
        const config = resetPasswordMail(req.user);
        await sendMail(config);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send('Password has been update');
    } catch (error) {
        next(error);
    }
}
async function deleteUser(req, res, next) {
    try {
        const { email } = req.user;
        await User.findOneAndDelete({ email });
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send('Delete Successfully!');
    } catch (error) {
        next(error);
    }
}
async function getUserProfile(req, res, next) {
    try {
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(req.user);
    } catch (error) {
        next(error);
    }
}

async function refreshToken(req, res, next) {
    try {
        const refreshToken = req.body.refreshToken || req.query.refreshToken || req.header['refreshToken'];
        if (refreshToken) {
            const decoded = await jwtHelper.verifyToken(refreshToken, jwtConfig.REFRESH.SECRET);
            if (decoded) {
                const accessToken = await jwtHelper.generateToken(decoded.data, jwtConfig.ACCESS.SECRET, jwtConfig.ACCESS.LIFE);
                return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                });
            }
            throw new APIError({ message: 'Refresh token wrong' });
        }
        throw new APIError({ message: 'No token provided !' });
    } catch (error) {
        next(error);
    }
}
async function searchUser(req, res, next) {
    try {
        const user = await UserService.search(req.body);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ length: user.length, users: user });
    } catch (error) {
        next(error);
    }
}
// ________________________________________________
module.exports = {
    postSignIn,
    postSignUp,
    editUserProfile,
    editPassword,
    deleteUser,
    getUserProfile,
    refreshToken,
    verifyAccount,
    searchUser,
};