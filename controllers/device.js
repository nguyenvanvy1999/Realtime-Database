const DeviceService = require('../services/device');
const { APIError } = require('../helpers/ErrorHandler');
const HTTP_STATUS_CODE = require('../config/constant/http');
async function getDeviceByID(req, res, next) {
    try {
        const deviceID = req.body.deviceID;
        const device = await DeviceService.getDevice(deviceID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(device);
    } catch (error) {
        next(error);
    }
}

async function getDeviceByUser(req, res, next) {
    try {
        const user = req.jwtDecoded.data;
        const devices = await DeviceService.getDeviceUser(user._id);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(devices);
    } catch (error) {
        next(error);
    }
}
async function getDeviceByUserAndType(req, res, next) {
    try {
        const user = req.jwtDecoded.data;
        const type = req.body.type;
        const devices = await DeviceService.getDeviceUserAndType(user._id, type);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(devices);
    } catch (error) {
        next(error);
    }
}
// must be Admin to used
async function getAllDevice(req, res, next) {
    try {
        const devices = await DeviceService.getAllDevice();
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(devices);
    } catch (error) {
        next(error);
    }
}
async function getAllDeviceSameType(req, res, next) {
    try {
        const type = req.body.type;
        const devices = await DeviceService.getAllDeviceSameType(type);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(devices);
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
        const result = await DeviceService.unLinkDevice(deviceID);
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
        const result = await DeviceService.unLinkAllDevice(user._id);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'UnLink Successfully !' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDevice: getAllDevice,
    getAllDeviceSameType: getAllDeviceSameType,
    getDeviceByID: getDeviceByID,
    getDeviceByUserAndType: getDeviceByUserAndType,
    getDeviceUser: getDeviceByUser,
    linkDeviceToUser: linkDeviceToUser,
    unLinkDevice: unLinkDeviceToUser,
    unLinkAllDevice: unLinkAllDevice,
};