const uploadFile = require('../middleware/upload').uploadFileMiddle;
const { APIError } = require('../helpers/ErrorHandler');
const HTTP_STATUS_CODE = require('../config/constants').HTTP_STATUS_CODE;
const fs = require('fs');
async function upload(req, res, next) {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            throw new APIError({ message: 'Please upload a file' });
        }

        res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Uploaded the file successfully: ' + req.file.originalname,
        });
    } catch (error) {
        next(error);
    }
}

function getListFiles(req, res, next) {
    try {
        const directoryPath =
            'C:/Users/DELL PRECISION/OneDrive/Máy tính/realtimeDatabase/uploads/';
        console.log(__dirname);
        fs.readdir(directoryPath, function(err, files) {
            if (err) {
                res.status(HTTP_STATUS_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR).send({
                    message: 'Unable to scan files!',
                });
            }
            let fileInfos = [];
            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: directoryPath + file,
                });
            });
            res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(fileInfos);
        });
    } catch (error) {
        next(error);
    }
}

function download(req, res, next) {
    try {
        const fileName = req.body.name;
        const directoryPath =
            'C:/Users/DELL PRECISION/OneDrive/Máy tính/realtimeDatabase/uploads/';
        res.download(directoryPath + fileName, fileName, (err) => {
            if (err) {
                res.status(HTTP_STATUS_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR).send({
                    message: 'Could not download the file. ' + err,
                });
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    upload,
    getListFiles,
    download,
};