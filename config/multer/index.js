const multer = require('multer');
const config = require('../../config/constants');
var today = new Date();
var date =
    today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear();
var time =
    today.getHours() + '_' + today.getMinutes() + '_' + today.getSeconds();
var dateTime = date + '_' + time;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, dateTime + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jfif'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: config.multer.maxSize,
    },
    fileFilter: fileFilter,
});
module.exports = upload;