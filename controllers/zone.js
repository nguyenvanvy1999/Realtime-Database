const Zone = require('../models/zone');
const ZoneService = require('../services/zone');
const HTTP_STATUS_CODE = require('../config/constant/http');
async function newZone(req, res, next) {
    try {
        const user = req.jwtDecoded.data;
        const devices = req.body.devices;
        const newZone = ZoneService.newZone(user, devices);
        const result = await ZoneService.insert(newZone);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Create zone successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
async function insertDevice(req, res, next) {
    try {
        const device = req.body.device;
        const zone = req.body.zone;
        const result = await ZoneService.addDevice(zone, device);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Add device successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
async function insertManyDevice(req, res, next) {
    try {
        const zone = req.body.zone;
        const devices = req.body.devices;
        const result = await ZoneService.addManyDevices(zone, devices);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Add devices successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
module.exports = {};