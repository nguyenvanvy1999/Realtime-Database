const faker = require('faker'),
    seeder = require('mongoose-seed'),
    User = require('../../models/user'),
    mongoConfig = require('../../config/constant/mongo'),
    bcryptHelper = require('../../helpers/bcrypt'),
    User = require('../../models/user'),
    ObjectId = require('mongoose').Types.ObjectId,
    UserService = require('../../services/user');

async function seedMany() {
    try {
        let items = [];
        for (let i = 0; i < 10; i++)
            items.push({
                email: faker.internet.email(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                password: await bcryptHelper.hash('1234'), //for test
            });
        seeder.connect(mongoConfig.host, () => {
            seeder.loadModels(User);
            seeder.clearModels(['user']);
            seeder.populateModels(data, (err, done) => {
                if (err) return console.log('Error seed');
                if (done) return console.log('Seed success');
            });
            seeder.disconnect();
        });
    } catch (error) {}
}

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

module.exports = { seedMany, seedAdmin, seedUser };