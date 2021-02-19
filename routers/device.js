const router = require('express').Router(),
    { handleError } = require('../middleware/error'),
    JwtMiddleware = require('../middleware/jwt'),
    multer = require('multer'),
    DeviceController = require('../controllers/device'),
    ZoneController = require('../controllers/zone'),
    UserMiddleware = require('../middleware/user'),
    Celebrate = require('../middleware/validate');

module.exports = () => {
    router.use(multer().none());
    router
        .route('/') //get device,using userID(required),deviceID,name,model,type(if no value, return all device of user)
        .get(Celebrate.device.getDevice, JwtMiddleware.isAuth, UserMiddleware.checkRole, DeviceController.getDeviceUser);
    router
        .route('/admin') //get device,using deviceID,name,model,type(if no value, return all device)
        .get(Celebrate.device.getDevice, JwtMiddleware.isAuth, UserMiddleware.checkRole, DeviceController.getDeviceAdmin);
    router.route('/link').get(JwtMiddleware.isAuth, DeviceController.linkDevice);
    router.route('/unlink').get(JwtMiddleware.isAuth, DeviceController.unLinkDevice);
    // _____________________________________________________________
    // _____________________________________________________________
    router.route('/new-zone').get(Celebrate.zone.newZone, JwtMiddleware.isAuth, ZoneController.newZone);
    router.route('/zone/insert-device').get(Celebrate.zone.one, JwtMiddleware.isAuth, ZoneController.insertDevice);
    router.route('/zone/insert-many').get(Celebrate.zone.many, JwtMiddleware.isAuth, ZoneController.insertManyDevice);
    router.route('/zone/remove-device').get(Celebrate.zone.one, JwtMiddleware.isAuth, ZoneController.removeDevice);
    router.route('/zone/remove-many').get(Celebrate.zone.many, JwtMiddleware.isAuth, ZoneController.removeManyDevices);
    return router;
};