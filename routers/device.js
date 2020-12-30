'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const DeviceController = require('../controllers/device');

module.exports = () => {
    router
        .route('/get-device-user-and-type')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.getDeviceByUserAndType,
            handleError
        );
    router
        .route('/get-device-user')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.getDeviceUser,
            handleError
        );
    router
        .route('/get-device')
        .get(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.getDeviceByID,
            handleError
        );
    router
        .route('/link-device')
        .get(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.linkDeviceToUser,
            handleError
        );
    router
        .route('/unlink-device')
        .get(
            multer().none(),
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.unLinkDevice,
            handleError
        );
    //FIXME: add role admin auth
    router
        .route('/admin/get-all-device')
        .get(multer().none(), DeviceController.getAllDevice, handleError);
    router
        .route('/admin/get-device-same-type')
        .get(multer().none(), DeviceController.getAllDeviceSameType, handleError);

    return router;
};