const celebrateSchema = require('../config/joi'),
	{ celebrate } = require('celebrate');
//FIXME:

const Celebrate = {
	user: {
		login: celebrate(celebrateSchema.user.login),
		signup: celebrate(celebrateSchema.user.signup),
		editProfile: celebrate(celebrateSchema.user.editProfile),
		editPassword: celebrate(celebrateSchema.user.editPassword),
		verifyAccount: celebrate(celebrateSchema.user.verifyAccount),
		postForgotPassword: celebrate(celebrateSchema.user.postForgotPassword),
		getForgetPassword: celebrate(celebrateSchema.user.getForgotPassword),
		token: celebrate(celebrateSchema.user.token),
		search: celebrate(celebrateSchema.user.search),
	},
	device: {
		getDevice: celebrate(celebrateSchema.device.getDevice),
		deviceID: celebrate(celebrateSchema.device.deviceID),
	},
	zone: {
		newZone: celebrate(celebrateSchema.zone.newZone),
		one: celebrate(celebrateSchema.zone.one),
		many: celebrate(celebrateSchema.zone.many),
	},
};

module.exports = Celebrate;
