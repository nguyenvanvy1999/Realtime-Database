const router = require('express').Router();
const UserController = require('../controllers/user');
const authSignUp = require('../middleware/authSignUp');
const authMiddleware = require('../middleware/authMiddleware');
const { handleError } = require('../middleware/error');
const authEditUser = require('../middleware/authEditUser');
const multer = require('multer');
const joiMiddleware = require('../middleware/joi');
// ________________________________________________
module.exports = () => {
    router.use(multer().none());
    router
        .route('/sign-up')
        .post(
            joiMiddleware.joiSignUp,
            authSignUp.checkDuplicateUsernameOrEmail,
            UserController.signUp,
            handleError
        );
    router
        .route('/sign-in')
        .post(
            joiMiddleware.joiSignIn,
            authMiddleware.isActive,
            UserController.signIn,
            handleError
        );

    router
        .route('/verify-account')
        .post(joiMiddleware.joiToken, UserController.verifyAccount, handleError);
    router.route('/get-all-users').get(UserController.getAllUser, handleError);
    router
        .route('/edit-user')
        .patch(
            joiMiddleware.joiToken,
            joiMiddleware.joiEdit,
            authMiddleware.isAuth,
            authMiddleware.isActive,
            authEditUser.checkUsernameAndPassword,
            UserController.editUser,
            handleError
        );
    router
        .route('/delete-user')
        .delete(
            joiMiddleware.joiToken,
            authMiddleware.isAuth,
            authMiddleware.isActive,
            UserController.deleteUser,
            handleError
        );
    router
        .route('/user-profile')
        .post(
            joiMiddleware.joiToken,
            authMiddleware.isAuth,
            authMiddleware.isActive,
            UserController.getUserProfile,
            handleError
        );
    router
        .route('/token')
        .get(joiMiddleware.joiToken, UserController.refreshToken, handleError);
    return router;
};