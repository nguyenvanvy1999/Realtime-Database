'user strict';
const DataController = require('../controllers/data');
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const joiMiddleware = require('../middleware/joi');

const multer = require('multer');
module.exports = () => {
    router.use(multer().none());
    router
        .route('/get-data-user')
        .get(
            joiMiddleware.joiToken,
            authMiddleware.isAuth,
            DataController.getDataByUser,
            handleError
        );
    router
        .route('/get-data-device')
        .get(
            joiMiddleware.joiDeviceID,
            authMiddleware.isAuth,
            DataController.getDataByDevice,
            handleError
        );
    router
        .route('/delete-data-user')
        .delete(
            joiMiddleware.joiToken,
            authMiddleware.isAuth,
            DataController.deleteDataByUser,
            handleError
        );
    router
        .route('/delete-data-device')
        .delete(
            joiMiddleware.joiDeviceID,
            authMiddleware.isAuth,
            DataController.deleteDataByDevice,
            handleError
        );
    return router;
};