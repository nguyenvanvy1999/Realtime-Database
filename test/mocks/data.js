const faker = require('faker');
const { ref } = require('joi');
const dataFaker = {
	signup: {
		email: faker.internet.email('vy').toLowerCase(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		password: faker.internet.password(),
	},
};

module.exports = dataFaker;
