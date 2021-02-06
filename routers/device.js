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
    router.route('/').get(JwtMiddleware.isAuth, DeviceController.getDeviceUser); //FIXME:add joi validate here
    router.route('/admin').get(DeviceController.getDeviceAdmin); //FIXME:add joi validate and role user
    router
        .route('/link-device')
        .get(
            JoiValidate.device.tokenAndDeviceID,
            JwtMiddleware.isAuth,
            DeviceController.linkDeviceToUser
        );
    router
        .route('/unlink-device')
        .get(
            JoiValidate.device.tokenAndDeviceID,
            JwtMiddleware.isAuth,
            DeviceController.unLinkDeviceToUser
        );
    router
        .route('/unlink-all-device')
        .get(
            JoiValidate.user.token,
            JwtMiddleware.isAuth,
            DeviceController.unLinkAllDevice
        );
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