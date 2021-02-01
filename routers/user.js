const router = require('express').Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');
const { handleError } = require('../middleware/error');
const authEditUser = require('../middleware/authEditUser');
const multer = require('multer');
const JoiValidate = require('../middleware/joi');
const passport = require('passport');
// ________________________________________________
module.exports = () => {
    router.use(multer().none());
    router
        .route('/sign-up')
        .post(
            JoiValidate.user.signUp,
            passport.authenticate('local-signup'),
            UserController.signUp,
            handleError
        );
    router
        .route('/sign-in')
        .post(
            JoiValidate.user.signIn,
            passport.authenticate('local-signin'),
            UserController.signIn,
            handleError
        );

    router
        .route('/verify-account')
        .post(JoiValidate.user.token, UserController.verifyAccount, handleError);
    router.route('/get-all-users').get(UserController.getAllUser, handleError); //FIXME:add role admin
    router
        .route('/edit-user')
        .patch(
            JoiValidate.user.editUser,
            authMiddleware.isAuth,
            authEditUser.checkUsernameAndPassword,
            UserController.editUser,
            handleError
        );
    router
        .route('/delete-user')
        .delete(
            JoiValidate.user.token,
            authMiddleware.isAuth,
            UserController.deleteUser,
            handleError
        );
    router
        .route('/user-profile')
        .post(
            JoiValidate.user.token,
            authMiddleware.isAuth,
            UserController.getUserProfile,
            handleError
        );
    router
        .route('/token')
        .get(JoiValidate.user.token, UserController.refreshToken, handleError);
    return router;
};