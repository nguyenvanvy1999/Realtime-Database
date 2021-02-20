const User = require('../../models/user'),
	bcryptHelper = require('../../helpers/bcrypt'),
	ObjectId = require('mongoose').Types.ObjectId,
	UserService = require('../../services/user');

async function seedAdmin() {
	try {
		const admin = {
			_id: new ObjectId(),
			email: 'admin@example.com',
			firstName: 'FirstName',
			lastName: 'LastName',
			password: 'password',
			isActive: true,
			roles: 'Admin',
		};
		return await UserService.insert(admin);
	} catch (error) {
		throw new Error(error);
	}
}

async function seedUser() {
	try {
		const user = {
			_id: new ObjectId(),
			email: 'user@example.com',
			firstName: 'FirstName',
			lastName: 'LastName',
			password: 'password',
			isActive: true,
			roles: 'User',
		};
		return await UserService.insert(user);
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = { seedAdmin, seedUser };
