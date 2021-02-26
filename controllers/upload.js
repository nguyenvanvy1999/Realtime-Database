const { APIError } = require('../helpers/error'),
	fs = require('fs'),
	uploadMiddleware = require('../middleware/multer'),
	DataService = require('../services/data'),
	{ pathUpload } = require('../config/index');

async function uploadFiles(req, res, next) {
	try {
		await uploadMiddleware(req, res);
		if (req.files.length <= 0) {
			throw new APIError({
				message: 'Please choose a file or check your file type',
			});
		}
		const user = req.user;
		const files = req.files;
		const data = DataService.newFileData(user, files);
		await DataService.insert(data);
		return res.status(200).send({
			message: 'Uploaded files successfully ',
		});
	} catch (error) {
		next(error);
	}
}

function getListFiles(req, res, next) {
	try {
		const { email } = req.user;
		const dir = `${pathUpload}${email}`;
		fs.readdir(dir, function (err, files) {
			if (err) {
				throw new APIError({ message: 'Unable to scan files!' });
			}
			let fileInfos = [];
			files.forEach((file) => {
				fileInfos.push({
					name: file,
					url: dir + file,
				});
			});
			res.status(200).send(fileInfos);
		});
	} catch (error) {
		next(error);
	}
}

function download(req, res, next) {
	try {
		const { email } = req.user;
		const { name } = req.body;
		const dir = `${pathUpload}${email}/${name}`;
		if (!fs.existsSync(dir)) {
			throw new APIError({ message: 'No such file or directory' });
		}
		res.download(dir, name);
	} catch (error) {
		next(error);
	}
}

module.exports = { uploadFiles, getListFiles, download };
