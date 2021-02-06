const DeviceService = require('../services/device');
const { APIError } = require('../helpers/error');
const HTTP_STATUS_CODE = require('../config/constant/http');

async function getDeviceUser(req, res, next) {
    try {
        const user = req.jwtDecoded.data._id;
        const result = await DeviceService.getDeviceUser(user, req.body);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ length: result.length, result: result });
    } catch (error) {
        next(error);
    }
}
async function getDeviceAdmin(req, res, next) {
    try {
        const result = await DeviceService.getDeviceAdmin(req.body);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ length: result.length, result: result });
    } catch (error) {
        next(error);
    }
}
async function linkDeviceToUser(req, res, next) {
    try {
        const user = req.jwtDecoded.data;
        const deviceID = req.body.deviceID;
        const result = await DeviceService.linkDeviceWithUser(deviceID, user._id);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Link successfully !', result });
    } catch (error) {
        next(error);
    }
}
async function unLinkDeviceToUser(req, res, next) {
    try {
        const deviceID = req.body.deviceID;
        await DeviceService.unLinkDevice(deviceID);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'UnLink Successfully !' });
    } catch (error) {
        next(error);
    }
}
async function unLinkAllDevice(req, res, next) {
    try {
        const user = req.jwtDecoded.data;
        await DeviceService.unLinkAllDevice(user._id);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'UnLink Successfully !' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDeviceUser,
    getDeviceAdmin,
    linkDeviceToUser,
    unLinkDeviceToUser,
    unLinkAllDevice,
};