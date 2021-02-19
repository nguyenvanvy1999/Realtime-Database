const router = require('express').Router(),
    UserController = require('../controllers/user'),
    JwtMiddleware = require('../middleware/jwt'),
    { handleError } = require('../middleware/error'),
    UserMiddleware = require('../middleware/user'),
    multer = require('multer'),
    Celebrate = require('../middleware/validate');
// ________________________________________________
module.exports = () => {
    router.use(multer().none());
    router.post('/login', Celebrate.user.login, UserController.postSignIn);
    router.post('/signup', Celebrate.user.signup, UserController.postSignUp);
    router.route('/search').get(Celebrate.user.search, UserMiddleware.checkRole, UserController.searchUser);
    router
        .route('/') //get user (User Profile)
        .get(Celebrate.user.token, JwtMiddleware.isAuth, UserController.getUserProfile);
    router
        .route('/') //edit user
        .patch(Celebrate.user.editProfile, JwtMiddleware.isAuth, UserMiddleware.checkEditUser, UserController.editUser);
    router
        .route('/') //delete user
        .delete(Celebrate.user.token, JwtMiddleware.isAuth, UserController.deleteUser);
    router
        .route('/verify') // verify account
        .get(Celebrate.user.token, UserController.verifyAccount);
    router
        .route('/refresh') //refresh token
        .get(Celebrate.user.token, UserController.refreshToken);
    return router;
};