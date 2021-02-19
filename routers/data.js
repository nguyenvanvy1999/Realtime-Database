const DataController = require('../controllers/data'),
    router = require('express').Router(),
    { handleError } = require('../middleware/error'),
    JwtMiddleware = require('../middleware/jwt'),
    Celebrate = require('../middleware/validate');

const multer = require('multer');
module.exports = () => {
    router.use(multer().none());
    router.route('/get-data-user').get(Celebrate.user.token, JwtMiddleware.isAuth, DataController.getDataByUser);
    router.route('/get-data-device').get(Celebrate.device.deviceID, JwtMiddleware.isAuth, DataController.getDataByDevice);
    router.route('/delete-data-user').delete(Celebrate.user.token, JwtMiddleware.isAuth, DataController.deleteDataByUser);
    router
        .route('/delete-data-device')
        .delete(Celebrate.device.deviceID, JwtMiddleware.isAuth, DataController.deleteDataByDevice);
    return router;
};