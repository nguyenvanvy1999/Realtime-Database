const router = require('express').Router();
const UserController = require('../controllers/user');
const authSignUp = require('../middleware/authSignUp');
const authMiddleware = require('../middleware/authMiddleware');
const { handleError } = require('../middleware/error');
const authEditUser = require('../middleware/authEditUser');
const upload = require('../helpers/multer/index').upload;
// ________________________________________________
module.exports = () => {
  router
    .route('/sign-up')
    .post(
      upload.single('userImage'),
      authSignUp.checkDuplicateUsernameOrEmail,
      UserController.signUp,
      handleError
    );
  router
    .route('/sign-in')
    .post(
      upload.single(),
      authMiddleware.isActive,
      UserController.signIn,
      handleError
    );

  router
    .route('/verify-account')
    .post(upload.single(), UserController.verifyAccount, handleError);
  router
    .route('/get-all-users')
    .get(upload.single(), UserController.getAllUser, handleError);
  router
    .route('/edit-user')
    .patch(
      upload.single(),
      authMiddleware.isAuth,
      authMiddleware.isActive,
      authEditUser.checkUsernameAndPassword,
      UserController.editUser,
      handleError
    );
  router
    .route('/delete-user')
    .delete(
      upload.single(),
      authMiddleware.isAuth,
      authMiddleware.isActive,
      UserController.deleteUser,
      handleError
    );
  router
    .route('/user-profile')
    .post(
      upload.single(),
      authMiddleware.isAuth,
      authMiddleware.isActive,
      UserController.getUserProfile,
      handleError
    );
  router
    .route('/token')
    .get(upload.single(), UserController.refreshToken, handleError);
  return router;
};
