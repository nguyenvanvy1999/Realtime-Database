const DeviceService = require('../services/device'),
	{ APIError } = require('../helpers/error');

async function getDeviceUser(req, res, next) {
	try {
		const user_id = req.user._id;
		const result = await DeviceService.getDeviceUser(user_id, req.body);
		return res.status(200).send({ length: result.length, result: result });
	} catch (error) {
		next(error);
	}
}
async function getDeviceAdmin(req, res, next) {
	try {
		const result = await DeviceService.getDeviceAdmin(req.body);
		return res.status(200).send({ length: result.length, result: result });
	} catch (error) {
		next(error);
	}
}

async function linkDevice(req, res, next) {
	try {
		const user_id = req.user._id;
		const result = await DeviceService.link(user_id, req.body);
		return res.status(200).send({ message: 'Active device successfully', result: result });
	} catch (error) {
		next(error);
	}
}

async function unLinkDevice(req, res, next) {
	try {
		const result = await DeviceService.unLink(req.body);
		return res.status(200).send({ message: 'Un Active device successfully', result: result });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getDeviceUser,
	getDeviceAdmin,
	linkDevice,
	unLinkDevice,
};
