'user strict';
const express = require('express');
const DataController = require('../controllers/data');
const router = express.Router();
const upload = require('../helpers/multer/index').upload;
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
module.exports = () => {
    router
        .route('/get-data')
        .get(
            upload.single(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.getData,
            handleError
        );
    router
        .route('/get-all-data')
        .get(upload.single(), DataController.getAllData, handleError);
    router
        .route('/delete-data')
        .delete(
            upload.single(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.deleteData,
            handleError
        );
    router
        .route('/upload/single')
        .post(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            upload.single('file'),
            DataController.uploadFile,
            handleError
        );
    router
        .route('/upload/multi')
        .post(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            upload.array('files'),
            DataController.uploadFile,
            handleError
        );
    return router;
};