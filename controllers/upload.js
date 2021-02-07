const uploadHelper = require('../helpers/multer');
const { APIError } = require('../helpers/error');
const HTTP_STATUS_CODE = require('../config/constant/http');
const fs = require('fs');
const fileConfig = require('../config/constant/file');
async function upload(req, res, next) {
    try {
        await uploadHelper(req, res);
        if (!req.files) {
            throw new APIError({
                message: 'Please choose a file or check your file type',
            });
        }
        res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Uploaded files successfully ',
        });
    } catch (error) {
        next(error);
    }
}

function getListFiles(req, res, next) {
    try {
        const { email } = req.jwtDecoded.data;
        const dir = `${fileConfig.path}${email}`;
        fs.readdir(dir, function(err, files) {
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
        const { email } = req.jwtDecoded.data;
        const { name } = req.body;
        const dir = `${fileConfig.path}${email}/${name}`;
        if (!fs.existsSync(dir)) {
            throw new APIError({ message: 'No such file or directory' });
        }
        res.download(dir, name);
    } catch (error) {
        next(error);
    }
}

module.exports = { upload, getListFiles, download };