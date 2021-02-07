const util = require('util');
const upload = require('../config/setting/multer/index');

const uploadFiles = upload.array('files', 10);

const uploadHelper = util.promisify(uploadFiles);

module.exports = uploadHelper;