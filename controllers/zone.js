const ZoneService = require('../services/zone'),
    HTTP_STATUS_CODE = require('../config/constant/http'),
    { APIError } = require('../helpers/error');
async function newZone(req, res, next) {
    try {
        const user = req.user;
        const { description, name, deviceID } = req.body; //FIXME:deviceID
        const newZone = ZoneService.newZone(user, deviceID, name, description);
        const result = await ZoneService.insert(newZone);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Create zone successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
async function insertDevice(req, res, next) {
    try {
        const { deviceID, zoneID } = req.body;
        const result = await ZoneService.addDevice(zoneID, deviceID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Add device successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
async function insertManyDevice(req, res, next) {
    try {
        const { zoneID, devicesID } = req.body;
        const result = await ZoneService.addManyDevices(zoneID, devicesID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Add devices successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
async function removeDevice(req, res, next) {
    try {
        const { zoneID, deviceID } = req.body;
        const result = await ZoneService.removeDevice(zoneID, deviceID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Remove device successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
async function removeManyDevices(req, res, next) {
    try {
        const { zoneID, devicesID } = req.body;
        const result = await ZoneService.removeDevice(zoneID, devicesID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Remove devices successfully !', result: result });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    newZone,
    insertDevice,
    insertManyDevice,
    removeDevice,
    removeManyDevices,
};