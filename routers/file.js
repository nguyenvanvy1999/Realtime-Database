'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const UploadController = require('../controllers/upload');
const multer = require('multer');

module.exports = () => {
    router
        .route('/upload/single')
        .post(authMiddleware.isAuth, UploadController.upload, handleError);
    router
        .route('/upload/multi')
        .post(authMiddleware.isAuth, UploadController.upload, handleError); //FIXME:fix  upload many files
    router
        .route('/list-file')
        .get(multer().none(), UploadController.getListFiles, handleError); // FIXME: add role auth here
    router
        .route('/download')
        .get(multer().none(), UploadController.download, handleError); // FIXME: add role auth here
    return router;
};