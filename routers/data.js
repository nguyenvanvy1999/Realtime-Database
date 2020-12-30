'user strict';
const DataController = require('../controllers/data');
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const UploadController = require('../controllers/upload');
const multer = require('multer');
module.exports = () => {
    router
        .route('/get-data-user')
        .get(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.getDataByUser,
            handleError
        );
    router
        .route('/get-data-device')
        .get(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.getDataByDevice,
            handleError
        );
    router
        .route('/delete-data-user')
        .delete(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.deleteDataByUser,
            handleError
        );
    router
        .route('/delete-data-device')
        .delete(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DataController.deleteDataByDevice,
            handleError
        );
    return router;
};