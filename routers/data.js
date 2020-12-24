'user strict';
const express = require('express');
const DataController = require('../controllers/data');
const router = express.Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const UploadController = require('../controllers/upload');
const multer = require('multer');
module.exports = () => {
    router
        .route('/get-data')
        .get(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.getData,
            handleError
        );
    router.route('/get-all-data').get(DataController.getAllData, handleError);
    router
        .route('/delete-data')
        .delete(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.deleteData,
            handleError
        );
    router.route('/upload/single').post(
        //authMiddleware.isAuth,
        //authMiddleware.isActive,
        UploadController.upload,
        handleError
    );
    router.route('/upload/multi').post(
        //authMiddleware.isAuth,
        //authMiddleware.isActive,
        UploadController.upload,
        handleError
    );
    router
        .route('/list-file')
        .get(multer().none(), UploadController.getListFiles, handleError);
    router
        .route('/download')
        .get(multer().none(), UploadController.download, handleError);
    return router;
};