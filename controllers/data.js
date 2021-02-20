const DataService = require('../services/data'),
    HTTP_STATUS_CODE = require('../config/constant/http'),
    { APIError } = require('../helpers/error');
async function getDataByUser(req, res, next) {
    try {
        const user = req.user;
        const dataDocuments = await DataService.getDataByUser(user._id);
        if (dataDocuments.length === 0) {
            throw new APIError({ message: 'No data found' });
        }
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(dataDocuments);
    } catch (error) {
        next(error);
    }
}
async function getDataByDevice(req, res, next) {
    try {
        const { deviceID } = req.body;
        if (!deviceID) {
            throw new APIError({ message: 'Please choose device to get data' });
        }
        const dataDocuments = await DataService.getDataByDevice(deviceID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(dataDocuments);
    } catch (error) {
        next(error);
    }
}
async function deleteDataByUser(req, res, next) {
    try {
        const user = req.user;
        await DataService.deleteDataByUser(user._id);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Delete success' });
    } catch (error) {
        next(error);
    }
}
async function deleteDataByDevice(req, res, next) {
    try {
        const { deviceID } = req.body;
        await DataService.deleteDataByDevice(deviceID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Delete success' });
    } catch (error) {
        next(error);
    }
}
async function deleteOneData(req, res, next) {
    try {
        const { dataID } = req.body;
        await DataService.deleteOneData(dataID);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Delete success' });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getDataByDevice,
    getDataByUser,
    deleteDataByDevice,
    deleteDataByUser,
    deleteOneData,
};