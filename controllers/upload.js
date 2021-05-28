const { APIError } = require('../helpers/error'),
	fs = require('fs'),
	uploadMiddleware = require('../middleware/multer'),
	DataService = require('../services/data'),
	{ get } = require('../config/index');

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
		const dir = `${get('PATH')}${email}`;
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
		const dir = `${get('PATH')}${email}/${name}`;
		if (!fs.existsSync(dir)) {
			throw new APIError({ message: 'No such file or directory' });
		}
		res.download(dir, name);
	} catch (error) {
		next(error);
	}
}
function streamVideo(req, res, next) {
	try {
		const { name } = req.params;
		const videoPath = path.join(__dirname, '../../public/video/', name + '.mp4');
		if (!fs.existsSync(videoPath)) throw new HttpException(404, 'File not found');
		const stat = fs.statSync(videoPath);
		const total = stat.size;
		if (req.headers.range) {
			const range = req.headers.range;
			const parts = range.replace(/bytes=/, '').split('-');
			const partialStart = parts[0];
			const partialEnd = parts[1];
			const start = parseInt(partialStart, 10);
			const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
			const chunkSize = end - start + 1;
			const file = fs.createReadStream(videoPath, { start, end });
			res.writeHead(206, {
				'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunkSize,
				'Content-Type': 'video/mp4',
			});
			file.pipe(res);
		} else {
			res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
			fs.createReadStream(videoPath).pipe(res);
		}
	} catch (error) {
		next(error);
	}
}

module.exports = { uploadFiles, getListFiles, download };
