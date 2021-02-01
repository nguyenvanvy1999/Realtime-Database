'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const JwtMiddleware = require('../middleware/jwt');
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
            JwtMiddleware.isAuth,
            DeviceController.getDeviceByUserAndType,
            handleError
        );
    router
        .route('/get-device-user')
        .get(
            JoiValidate.user.token,
            JwtMiddleware.isAuth,
            DeviceController.getDeviceByUser,
            handleError
        );
    router
        .route('/get-device')
        .get(
            JoiValidate.device.deviceID,
            JwtMiddleware.isAuth,
            DeviceController.getDeviceByID,
            handleError
        );
    router
        .route('/link-device')
        .get(
            JoiValidate.device.tokenAndDeviceID,
            JwtMiddleware.isAuth,
            DeviceController.linkDeviceToUser,
            handleError
        );
    router
        .route('/unlink-device')
        .get(
            JoiValidate.device.tokenAndDeviceID,
            JwtMiddleware.isAuth,
            DeviceController.unLinkDeviceToUser,
            handleError
        );
    router
        .route('/unlink-all-device')
        .get(
            JoiValidate.user.token,
            JwtMiddleware.isAuth,
            DeviceController.unLinkAllDevice,
            handleError
        );
    // _____________________________________________________________
    router
        .route('/new-zone')
        .get(
            JoiValidate.zone.newZone,
            JwtMiddleware.isAuth,
            ZoneController.newZone,
            handleError
        );
    router
        .route('/zone/insert-device')
        .get(
            JoiValidate.zone.one,
            JwtMiddleware.isAuth,
            ZoneController.insertDevice,
            handleError
        );
    router
        .route('/zone/insert-many')
        .get(
            JoiValidate.zone.many,
            JwtMiddleware.isAuth,
            ZoneController.insertManyDevice,
            handleError
        );
    router
        .route('/zone/remove-device')
        .get(
            JoiValidate.zone.one,
            JwtMiddleware.isAuth,
            ZoneController.removeDevice,
            handleError
        );
    router
        .route('/zone/remove-many')
        .get(
            JoiValidate.zone.many,
            JwtMiddleware.isAuth,
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