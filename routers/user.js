const router = require('express').Router(),
    UserController = require('../controllers/user'),
    JwtMiddleware = require('../middleware/jwt'),
    { handleError } = require('../middleware/error'),
    UserMiddleware = require('../middleware/user'),
    multer = require('multer'),
    Celebrate = require('../middleware/validate'),
    passport = require('passport');
// ________________________________________________
module.exports = () => {
    router.use(multer().none());
    router.post('/login', Celebrate.user.login, passport.authenticate('local'), UserController.postSignIn);
    router.post('/signup', Celebrate.user.signup, UserController.postSignUp);
    router.get('/search', Celebrate.user.search, UserMiddleware.checkRole, UserController.searchUser); //FIXME:
    router
        .route('/')
        .get(UserMiddleware.isAuth, UserController.getUserProfile) //user profile
        .patch(Celebrate.user.editProfile, JwtMiddleware.isAuth, UserController.editUserProfile) //edit user profile
        .delete(Celebrate.user.token, JwtMiddleware.isAuth, UserController.deleteUser); //delete user
    router
        .route('/forgot')
        .get(Celebrate.user.getForgetPassword, UserController.getForgotPassword)
        .post(Celebrate.user.postForgotPassword, UserController.postForgotPassword);
    router.post('/verify/:token', Celebrate.user.verifyAccount, UserController.verifyAccount); //send token to query
    router.get('refresh/', Celebrate.user.token, UserController.refreshToken);
    router.post('/password', Celebrate.user.editPassword, JwtMiddleware.isAuth, UserController.editPassword);
    return router;
};