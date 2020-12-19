const router = require("express").Router();
const UserController = require("../controllers/user");
const authSignUp = require("../middleware/authSignUp");
const authMiddleware = require("../middleware/authMiddleware");
const { handleError } = require("../middleware/error");
const authEditUser = require("../middleware/authEditUser");
const upload = require("../helpers/upload").upload;

// ________________________________________________
module.exports = () => {
    router
        .route("/sign-in")
        .post(upload.single(), UserController.signIn, handleError);
    router
        .route("/sign-up")
        .post(
            upload.single("userImage"),
            authSignUp.checkDuplicateUsernameOrEmail,
            UserController.signUp,
            handleError
        );
    router
        .route("/get-all-users")
        .get(upload.single(), UserController.getAllUser, handleError);
    router
        .route("/edit-user")
        .patch(
            upload.single(),
            authMiddleware.isAuth,
            authEditUser.checkUsernameAndPassword,
            UserController.editUser,
            handleError
        );
    router
        .route("/delete-user")
        .delete(
            upload.single(),
            authMiddleware.isAuth,
            UserController.deleteUser,
            handleError
        );
    router
        .route("/user-profile")
        .post(
            upload.single(),
            authMiddleware.isAuth,
            UserController.getUserProfile,
            handleError
        );
    router
        .route("/token")
        .get(upload.single(), UserController.refreshToken, handleError);
    return router;
};