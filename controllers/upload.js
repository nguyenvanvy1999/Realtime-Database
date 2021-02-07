const uploadFile = require('../middleware/upload').uploadFileMiddle;
const uploadFiles = require('../middleware/upload').uploadFilesMiddle;
const { APIError } = require('../helpers/error');
const HTTP_STATUS_CODE = require('../config/constant/http');
const fs = require('fs');
const fileConfig = require('../config/constant/file');
async function upload(req, res, next) {
    try {
        //FIXME:upload multi files
        await uploadFile(req, res);
        if (!req.file) {
            throw new APIError({
                message: 'Please choose a file or check your file type',
            });
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
        fs.readdir(fileConfig.path, function(err, files) {
            if (err) {
                throw new APIError({ message: 'Unable to scan files!' });
            }
            let fileInfos = [];
            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: fileConfig.path + file,
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
        const directoryPath = fileConfig.path + fileName;
        console.log(directoryPath);
        if (!fs.existsSync(directoryPath)) {
            throw new APIError({ message: 'No such file or directory' });
        }
        res.download(directoryPath, fileName);
    } catch (error) {
        next(error);
    }
}

module.exports = { upload, getListFiles, download };