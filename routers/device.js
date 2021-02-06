'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const JwtMiddleware = require('../middleware/jwt');
const multer = require('multer');
const DeviceController = require('../controllers/device');
const ZoneController = require('../controllers/zone');
const JoiValidate = require('../middleware/joi');
const UserMiddleware = require('../middleware/user');
module.exports = () => {
    router.use(multer().none());
    router
        .route('/') //get device,using userID(required),deviceID,name,model,type(if no value, return all device of user)
        .get(
            JoiValidate.device.getDevice,
            JwtMiddleware.isAuth,
            UserMiddleware.checkRole,
            DeviceController.getDeviceUser
        );
    router
        .route('/admin') //get device,using deviceID,name,model,type(if no value, return all device)
        .get(
            JoiValidate.device.getDevice,
            JwtMiddleware.isAuth,
            UserMiddleware.checkRole,
            DeviceController.getDeviceAdmin
        );
    router.route('/link').get(JwtMiddleware.isAuth, DeviceController.linkDevice);
    router
        .route('/unlink')
        .get(JwtMiddleware.isAuth, DeviceController.unLinkDevice);
    // _____________________________________________________________
    // _____________________________________________________________
    router
        .route('/new-zone')
        .get(
            JoiValidate.zone.newZone,
            JwtMiddleware.isAuth,
            ZoneController.newZone
        );
    router
        .route('/zone/insert-device')
        .get(
            JoiValidate.zone.one,
            JwtMiddleware.isAuth,
            ZoneController.insertDevice
        );
    router
        .route('/zone/insert-many')
        .get(
            JoiValidate.zone.many,
            JwtMiddleware.isAuth,
            ZoneController.insertManyDevice
        );
    router
        .route('/zone/remove-device')
        .get(
            JoiValidate.zone.one,
            JwtMiddleware.isAuth,
            ZoneController.removeDevice
        );
    router
        .route('/zone/remove-many')
        .get(
            JoiValidate.zone.many,
            JwtMiddleware.isAuth,
            ZoneController.removeManyDevices
        );
    router.use(handleError);
    return router;
};