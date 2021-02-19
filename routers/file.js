const router = require('express').Router(),
    { handleError } = require('../middleware/error'),
    JwtMiddleware = require('../middleware/jwt'),
    UploadController = require('../controllers/upload'),
    multer = require('multer'),
    UserMiddleware = require('../middleware/user');

module.exports = () => {
    router.route('/').post(JwtMiddleware.isAuth, UploadController.uploadFiles);
    router.route('/list').get(multer().none(), JwtMiddleware.isAuth, UploadController.getListFiles);
    router.route('/').get(multer().none(), JwtMiddleware.isAuth, UploadController.download);
    return router;
};