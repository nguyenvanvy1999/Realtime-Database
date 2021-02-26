const ZoneService = require('../services/zone'),
	{ APIError } = require('../helpers/error'),
	Zone = require('../models/zone');
async function newZone(req, res, next) {
	try {
		const user = req.user;
		const { description, name, deviceID } = req.body;
		const newZone = ZoneService.newZone(user, deviceID, name, description);
		const result = await ZoneService.insert(newZone);
		return res.status(200).send({ message: 'Create zone successfully !', result: result });
	} catch (error) {
		next(error);
	}
}
async function insertDevice(req, res, next) {
	try {
		const { deviceID, zoneID } = req.body;
		const result = await Zone.updateOne({ _id: zoneID }, { $push: { devices: deviceID } });
		return res.status(200).send({ message: 'Add device successfully !', result: result });
	} catch (error) {
		next(error);
	}
}
async function insertManyDevice(req, res, next) {
	try {
		const { zoneID, devicesID } = req.body;
		const result = await Zone.updateOne({ _id: zoneID }, { $push: { devices: { $each: devicesID } } });
		return res.status(200).send({ message: 'Add devices successfully !', result: result });
	} catch (error) {
		next(error);
	}
}
async function removeDevice(req, res, next) {
	try {
		const { zoneID, deviceID } = req.body;
		const result = await Zone.updateOne({ _id: zoneID }, { $pull: { devices: deviceID } });
		return res.status(200).send({ message: 'Remove device successfully !', result: result });
	} catch (error) {
		next(error);
	}
}
async function removeManyDevices(req, res, next) {
	try {
		const { zoneID, devicesID } = req.body;
		const result = await Zone.updateOne({ _id: zoneID }, { $pull: { devices: { $each: devicesID } } });
		return res.status(200).send({ message: 'Remove devices successfully !', result: result });
	} catch (error) {
		next(error);
	}
}

async function deleteZone(req, res, next) {
	try {
		const { zoneID } = req.body;
		await Zone.findByIdAndDelete(zoneID);
		return res.status(200).send('Delete Successfully!');
	} catch (error) {
		next(error);
	}
}

async function editZone(req, res, next) {
	try {
		const user = req.user;
		const { zoneID, name, description } = req.body;
		await Zone.findByIdAndUpdate(zoneID, { name, description });
	} catch (error) {
		next(error);
	}
}
module.exports = {
	newZone,
	insertDevice,
	insertManyDevice,
	removeDevice,
	removeManyDevices,
	deleteZone,
	editZone,
};
