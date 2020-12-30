const DataService = require('../services/data');
const HTTP_STATUS_CODE = require('../config/constant/http');
const { APIError } = require('../helpers/ErrorHandler');
async function getDataByUser(req, res, next) {
    try {
        let user = req.jwtDecoded.data;
        if (!user) {
            throw new APIError({ message: 'User wrong' });
        }
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
        let deviceID = req.body.deviceID;
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
        const user = req.jwtDecoded.data;
        let result = await DataService.deleteDataByUser(user._id);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Delete success' });
    } catch (error) {
        next(error);
    }
}
async function deleteDataByDevice(req, res, next) {
    try {
        let result = await DataService.deleteDataByDevice(req.body.deviceID);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Delete success' });
    } catch (error) {
        next(error);
    }
}
async function deleteOneData(req, res, next) {
    try {
        let result = await DataService.deleteOneData(req.body.dataID);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Delete success' });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getDataByDevice: getDataByDevice,
    getDataByUser: getDataByUser,
    deleteDataByDevice: deleteDataByDevice,
    deleteDataByUser: deleteDataByUser,
    deleteOneData: deleteOneData,
};