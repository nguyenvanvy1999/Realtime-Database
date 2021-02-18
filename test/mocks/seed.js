const faker = require('faker'),
    seeder = require('mongoose-seed'),
    User = require('../../models/user'),
    mongoConfig = require('../../config/constant/mongo');

async function seedUser() {
    try {
        let items = [];
        for (let i = 0; i < 10; i++)
            items.push({
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password: '1234', //for test
            });
        await seeder.connect(mongoConfig.host);
        const count = User.countDocuments();
        await seeder.loadModels(['../../models/user']);
        await seeder.populateModels(items);
    } catch (error) {}
}

module.exports = { seedUser };