const DataController = require('../controllers/data'),
    router = require('express').Router(),
    { handleError } = require('../middleware/error'),
    JwtMiddleware = require('../middleware/jwt'),
    JoiValidate = require('../middleware/joi');

const multer = require('multer');
module.exports = () => {
    router.use(multer().none());
    router
        .route('/get-data-user')
        .get(
            JoiValidate.user.token,
            JwtMiddleware.isAuth,
            DataController.getDataByUser
        );
    router
        .route('/get-data-device')
        .get(
            JoiValidate.device.deviceID,
            JwtMiddleware.isAuth,
            DataController.getDataByDevice
        );
    router
        .route('/delete-data-user')
        .delete(
            JoiValidate.user.token,
            JwtMiddleware.isAuth,
            DataController.deleteDataByUser
        );
    router
        .route('/delete-data-device')
        .delete(
            JoiValidate.device.deviceID,
            JwtMiddleware.isAuth,
            DataController.deleteDataByDevice
        );
    router.use(handleError);
    return router;
};