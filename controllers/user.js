const UserService = require('./../services/user.js'),
    jwtHelper = require('../helpers/jwt'),
    { APIError } = require('../helpers/error'),
    bcryptHelper = require('../helpers/bcrypt'),
    HTTP_STATUS_CODE = require('../config/constant/http'),
    mailHelper = require('../helpers/mailer'),
    jwtConfig = require('../config/constant/jwt'),
    mailConfig = require('../config/constant/mail').mailConfig,
    mailOption = require('../config/constant/mail').mailOption;
// ________________________________________________

function getSignIn(req, res) {
    res.render('./user/login/');
}
async function postSignIn(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.getUserByEmail(email);
        if (!user) throw new APIError({ message: 'Email wrong' });
        const isPassword = await bcryptHelper.compare(password, user.password);
        if (!isPassword) throw new APIError({ message: 'Password wrong' });
        const token = await jwtHelper.returnToken(user);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(token);
    } catch (error) {
        next(error);
    }
}

function getSignUp(req, res) {
    res.render('./user/signup/');
}
async function postSignUp(req, res, next) {
    try {
        const newUser = UserService.newUser(req.query);
        const token = await jwtHelper.generateToken(newUser, jwtConfig.VERIFY.SECRET, jwtConfig.VERIFY.LIFE);
        const text = {
            message: mailOption.text,
            token: token,
        };
        const newMail = mailHelper.newMailOption(mailConfig.auth.user, req.body.email, mailOption.subject, text);
        await mailHelper.sendMail(newMail);
        await UserService.insert(newUser);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Check your email and verify account!' });
    } catch (error) {
        next(error);
    }
}
async function verifyAccount(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        const decoded = await jwtHelper.verifyToken(token, jwtConfig.VERIFY.SECRET);
        await UserService.activeAccount(decoded.data.email);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Active successfully !' });
    } catch (error) {
        next(error);
    }
}

async function editUser(req, res, next) {
    try {
        const { email } = req.jwtDecoded.data;
        const { firstName, lastName } = req.query;
        const newPassword = await bcryptHelper.hash(req.query.password);
        const newUser = await UserService.editUser(email, firstName, lastName, newPassword);
        const token = await jwtHelper.returnToken(newUser);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ token });
    } catch (error) {
        next(error);
    }
}
async function deleteUser(req, res, next) {
    try {
        const email = req.body.email || req.jwtDecoded.data.email;
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
        }
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(user);
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
    getSignIn,
    postSignIn,
    getSignUp,
    postSignUp,
    editUser,
    deleteUser,
    getUserProfile,
    refreshToken,
    verifyAccount,
    searchUser,
};