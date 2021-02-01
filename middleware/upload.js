const util = require('util');
const upload = require('../config/setting/multer/index');

const uploadFile = upload.single('file');
const uploadFiles = upload.array('files');

const uploadFileMiddle = util.promisify(uploadFile);
const uploadFilesMiddle = util.promisify(uploadFiles);

module.exports = { uploadFileMiddle, uploadFilesMiddle };