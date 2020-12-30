const router = require('express').Router();
const UserController = require('../controllers/user');
const authSignUp = require('../middleware/authSignUp');
const authMiddleware = require('../middleware/authMiddleware');
const { handleError } = require('../middleware/error');
const authEditUser = require('../middleware/authEditUser');
const multer = require('multer');
// ________________________________________________
module.exports = () => {
    router.use(multer().none());
    router
        .route('/sign-up')
        .post(
            authSignUp.checkDuplicateUsernameOrEmail,
            UserController.signUp,
            handleError
        );
    router
        .route('/sign-in')
        .post(authMiddleware.isActive, UserController.signIn, handleError);

    router
        .route('/verify-account')
        .post(UserController.verifyAccount, handleError);
    router.route('/get-all-users').get(UserController.getAllUser, handleError);
    router
        .route('/edit-user')
        .patch(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            authEditUser.checkUsernameAndPassword,
            UserController.editUser,
            handleError
        );
    router
        .route('/delete-user')
        .delete(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            UserController.deleteUser,
            handleError
        );
    router.route('/user-profile').post(
        authMiddleware.isAuth,
        authMiddleware.isActive,
        UserController.getUserProfile,
        handleError
    );
    router.route('/token').get(UserController.refreshToken, handleError);
    return router;
};