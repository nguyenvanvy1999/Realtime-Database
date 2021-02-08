const multer = require('multer');
const multerConfig = require('../../constant/multer');
const fs = require('fs');
const util = require('util');
const { APIError } = require('../../../helpers/error');

const isValidate = function(req, file, cb) {
    if (!multerConfig.checkFile(file))
        return cb(new APIError({ message: 'Only images are allowed' }));
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const { email } = req.jwtDecoded.data;
        const dir = `./uploads/${email}`;
        fs.mkdirSync(dir, { recursive: true });
        return cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, multerConfig.getTime() + '_' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: isValidate,
    limits: { fileSize: multerConfig.maxSize },
});

module.exports = upload;