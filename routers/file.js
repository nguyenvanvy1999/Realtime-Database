'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const JwtMiddleware = require('../middleware/jwt');
const UploadController = require('../controllers/upload');
const multer = require('multer');

module.exports = () => {
    router
        .route('/upload/single')
        .post(JwtMiddleware.isAuth, UploadController.upload);
    router
        .route('/upload/multi')
        .post(JwtMiddleware.isAuth, UploadController.upload); //FIXME:fix  upload many files
    router
        .route('/list-file')
        .get(multer().none(), UploadController.getListFiles); // FIXME: add role auth here
    router.route('/download').get(multer().none(), UploadController.download); // FIXME: add role auth here
    router.use(handleError);
    return router;
};