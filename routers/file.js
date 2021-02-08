'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const JwtMiddleware = require('../middleware/jwt');
const UploadController = require('../controllers/upload');
const multer = require('multer');
const UserMiddleware = require('../middleware/user');

module.exports = () => {
    router.route('/').post(JwtMiddleware.isAuth, UploadController.uploadFiles);
    router
        .route('/list')
        .get(multer().none(), JwtMiddleware.isAuth, UploadController.getListFiles);
    router
        .route('/')
        .get(multer().none(), JwtMiddleware.isAuth, UploadController.download);
    router.use(handleError);
    return router;
};