const multer = require('multer');
const multerConfig = require('../../constant/multer');
const fs = require('fs');
const { exit } = require('process');
const fileFilter = function(req, file, cb) {
    if (multerConfig.checkFile(file)) cb(null, true);
    cb(null, false);
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const { email } = req.jwtDecoded.data;
        const dir = `./uploads/${email}`;
        fs.access(dir, function(error) {
            if (error) return fs.mkdir(dir, (error) => cb(error, dir));
            return cb(null, dir);
        });
    },
    filename: function(req, file, cb) {
        cb(null, multerConfig.getTime() + '_' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: multerConfig.maxSize,
    },
    fileFilter: fileFilter,
});
module.exports = upload;