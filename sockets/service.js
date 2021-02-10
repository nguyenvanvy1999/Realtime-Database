const DataService = require('../services/data'),
    jwtHelper = require('../helpers/jwt'),
    DeviceService = require('../services/device'),
    jwtConfig = require('../config/constant/jwt');

async function saveData(socket, document) {
    try {
        let newData = DataService.newData(socket, document);
        let result = await DataService.insert(newData);
        return result;
    } catch (error) {
        return false;
    }
}

async function checkSocketToken(document) {
    try {
        const device = await jwtHelper.verifyToken(
            document.device,
            jwtConfig.deviceSecret
        );
        const user = await jwtHelper.verifyToken(
            document.user,
            jwtConfig.accessSecret
        );
        document.device = device;
        document.user = user;
        return document;
    } catch (error) {
        return false;
    }
}
async function checkDevice(deviceID) {
    try {
        const device = await DeviceService.getDevice(deviceID);
        if (device != null) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

module.exports = { saveData, checkDevice, checkSocketToken };