const util = require('util'),
	upload = require('../config/multer');

const uploadMany = upload.array('files', 10);
const uploadMiddleware = util.promisify(uploadMany);
module.exports = uploadMiddleware;
