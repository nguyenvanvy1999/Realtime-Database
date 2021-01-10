'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const DeviceController = require('../controllers/device');
const ZoneController = require('../controllers/zone');
const joiMiddleware = require('../middleware/joi');

module.exports = () => {
    router.use(multer().none());
    router
        .route('/get-device-user-and-type')
        .get(
            joiMiddleware.joiDeviceTypeAndUser,
            authMiddleware.isAuth,
            DeviceController.getDeviceByUserAndType,
            handleError
        );
    router
        .route('/get-device-user')
        .get(
            joiMiddleware.joiToken,
            authMiddleware.isAuth,
            DeviceController.getDeviceByUser,
            handleError
        );
    router
        .route('/get-device')
        .get(
            joiMiddleware.joiDeviceID,
            authMiddleware.isAuth,
            DeviceController.getDeviceByID,
            handleError
        );
    router
        .route('/link-device')
        .get(
            joiMiddleware.joiDeviceIDAndUser,
            authMiddleware.isAuth,
            DeviceController.linkDeviceToUser,
            handleError
        );
    router
        .route('/unlink-device')
        .get(
            joiMiddleware.joiDeviceIDAndUser,
            authMiddleware.isAuth,
            DeviceController.unLinkDevice,
            handleError
        );
    router
        .route('/unlink-all-device')
        .get(
            joiMiddleware.joiToken,
            authMiddleware.isAuth,
            DeviceController.unLinkAllDevice,
            handleError
        );
    // _____________________________________________________________
    router
        .route('/new-zone')
        .get(
            joiMiddleware.joiNewZone,
            authMiddleware.isAuth,
            ZoneController.newZone,
            handleError
        );
    router
        .route('/zone/insert-device')
        .get(
            joiMiddleware.joiZoneIDAndDeviceID,
            authMiddleware.isAuth,
            ZoneController.insertDevice,
            handleError
        );
    router
        .route('/zone/insert-many')
        .get(
            joiMiddleware.joiZoneIDAndDevicesID,
            authMiddleware.isAuth,
            ZoneController.insertManyDevice,
            handleError
        );
    router
        .route('/zone/remove-device')
        .get(
            joiMiddleware.joiZoneIDAndDeviceID,
            authMiddleware.isAuth,
            ZoneController.removeDevice,
            handleError
        );
    router
        .route('/zone/remove-many')
        .get(
            joiMiddleware.joiZoneIDAndDevicesID,
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
            joiMiddleware.joiDeviceType,
            DeviceController.getAllDeviceSameType,
            handleError
        ); //FIXME: add role admin auth

    return router;
};