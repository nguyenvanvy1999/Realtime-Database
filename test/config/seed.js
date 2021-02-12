const User = require('../../models/user'),
    bcryptHelper = require('../../helpers/bcrypt'),
    { ObjectId } = require('mongoose').Schema.Types,
    UserService = require('../../services/user');

async function seedAdmin() {
    try {
        const admin = {
            _id: new ObjectId(),
            email: 'admin@example.com',
            username: 'admin',
            password: bcryptHelper.hash('password'),
            isActive: true,
            roles: 'Admin',
        };
        return await UserService.activeAccount(admin);
    } catch (error) {
        throw Error(error);
    }
}

async function seedUser() {
    try {
        const user = {
            _id: new ObjectId(),
            email: 'user@example.com',
            username: 'user',
            password: bcryptHelper.hash('password'),
            isActive: true,
            roles: 'User',
        };
        return await UserService.insert(user);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { seedAdmin, seedUser };