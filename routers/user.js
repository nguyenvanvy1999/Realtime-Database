const router = require('express').Router();
const UserController = require('../controllers/user');
const JwtMiddleware = require('../middleware/jwt');
const { handleError } = require('../middleware/error');
const UserMiddleware = require('../middleware/user');
const multer = require('multer');
const JoiValidate = require('../middleware/joi');
const passport = require('passport');
// ________________________________________________
module.exports = () => {
    router.use(multer().none());
    router
        .route('/register')
        .post(
            JoiValidate.user.signUp,
            passport.authenticate('local-signup'),
            UserController.signUp
        );
    router
        .route('/') //post user (Sign In)
        .post(
            JoiValidate.user.signIn,
            passport.authenticate('local-signin'),
            UserController.signIn
        );
    router
        .route('/') //get user (User Profile)
        .get(
            JoiValidate.user.token,
            JwtMiddleware.isAuth,
            UserController.getUserProfile
        );
    router
        .route('/') //edit user
        .patch(
            JoiValidate.user.editUser,
            JwtMiddleware.isAuth,
            UserMiddleware.checkUsernameAndPassword,
            UserController.editUser
        );
    router
        .route('/') //delete user
        .delete(
            JoiValidate.user.token,
            JwtMiddleware.isAuth,
            UserController.deleteUser
        );
    router
        .route('/verify') // verify account
        .post(JoiValidate.user.token, UserController.verifyAccount);
    router.route('/user').get(handleError);
    router.route('/users').get(UserController.getAllUser); //FIXME:add role admin
    router
        .route('/refresh') //refresh token
        .get(JoiValidate.user.token, UserController.refreshToken);
    router.use(handleError);
    return router;
};