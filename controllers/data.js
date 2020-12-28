const DataService = require('../services/data');
const HTTP_STATUS_CODE = require('../config/constant/http');
const { APIError } = require('../helpers/ErrorHandler');
async function getData(req, res, next) {
    try {
        let user = req.jwtDecoded.data;
        if (!user) {
            throw new APIError({ message: 'User wrong' });
        }
        const dataDocuments = await DataService.getData(user.email);
        if (dataDocuments.length === 0) {
            throw new APIError({ message: 'No data found' });
        }
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(dataDocuments);
    } catch (error) {
        next(error);
    }
}

async function getAllData(req, res, next) {
    try {
        const dataDocuments = await DataService.getAllData();
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(dataDocuments);
    } catch (error) {
        next(error);
    }
}
async function deleteData(req, res, next) {
    try {
        let user = req.jwtDecoded.data;
        let result = await DataService.deleteData(user.email);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send('delete successfully!');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getData: getData,
    getAllData: getAllData,
    deleteData: deleteData,
};