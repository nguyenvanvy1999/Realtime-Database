const DeviceService = require('../services/device'),
    { APIError } = require('../helpers/error'),
    HTTP_STATUS_CODE = require('../config/constant/http');

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

async function linkDevice(req, res, next) {
    try {
        const user = req.jwtDecoded.data._id;
        const result = await DeviceService.link(user, req.body);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Active device successfully', result: result });
    } catch (error) {
        next(error);
    }
}

async function unLinkDevice(req, res, next) {
    try {
        const result = await DeviceService.unLink(req.body);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Un Active device successfully', result: result });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDeviceUser,
    getDeviceAdmin,
    linkDevice,
    unLinkDevice,
};