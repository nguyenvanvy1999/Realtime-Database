const util = require('util');
const upload = require('../config/setting/multer/index');

const uploadMany = upload.array('files', 10);
const uploadMiddleware = util.promisify(uploadMany);
module.exports = uploadMiddleware;