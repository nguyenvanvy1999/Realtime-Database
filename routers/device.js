'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const DeviceController = require('../controllers/device');
const ZoneController = require('../controllers/zone');
const JoiValidate = require('../middleware/joi');

module.exports = () => {
    router.use(multer().none());
    router
        .route('/get-device-user-and-type')
        .get(
            JoiValidate.device.tokenAndDeviceID,
            authMiddleware.isAuth,
            DeviceController.getDeviceByUserAndType,
            handleError
        );
    router
        .route('/get-device-user')
        .get(
            JoiValidate.user.token,
            authMiddleware.isAuth,
            DeviceController.getDeviceByUser,
            handleError
        );
    router
        .route('/get-device')
        .get(
            JoiValidate.device.deviceID,
            authMiddleware.isAuth,
            DeviceController.getDeviceByID,
            handleError
        );
    router
        .route('/link-device')
        .get(
            JoiValidate.device.tokenAndDeviceID,
            authMiddleware.isAuth,
            DeviceController.linkDeviceToUser,
            handleError
        );
    router
        .route('/unlink-device')
        .get(
            JoiValidate.device.tokenAndDeviceID,
            authMiddleware.isAuth,
            DeviceController.unLinkDevice,
            handleError
        );
    router
        .route('/unlink-all-device')
        .get(
            JoiValidate.user.token,
            authMiddleware.isAuth,
            DeviceController.unLinkAllDevice,
            handleError
        );
    // _____________________________________________________________
    router
        .route('/new-zone')
        .get(
            JoiValidate.zone.newZone,
            authMiddleware.isAuth,
            ZoneController.newZone,
            handleError
        );
    router
        .route('/zone/insert-device')
        .get(
            JoiValidate.zone.one,
            authMiddleware.isAuth,
            ZoneController.insertDevice,
            handleError
        );
    router
        .route('/zone/insert-many')
        .get(
            JoiValidate.zone.many,
            authMiddleware.isAuth,
            ZoneController.insertManyDevice,
            handleError
        );
    router
        .route('/zone/remove-device')
        .get(
            JoiValidate.zone.one,
            authMiddleware.isAuth,
            ZoneController.removeDevice,
            handleError
        );
    router
        .route('/zone/remove-many')
        .get(
            JoiValidate.zone.many,
            authMiddleware.isAuth,
            ZoneController.removeManyDevices,
            handleError
        );
    // _____________________________________________________________
    router
        .route('/admin/get-all-device')
        .get(DeviceController.getAllDevice, handleError); //FIXME: add role admin auth
    router
        .route('/admin/get-device-same-type')
        .get(
            JoiValidate.device.type,
            DeviceController.getAllDeviceSameType,
            handleError
        ); //FIXME: add role admin auth

    return router;
};