const faker = require('faker');
const { ref } = require('joi');
const dataFaker = {
	signup: {
		email: 'nguyenvanvy1999@gmail.com',
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		password: faker.internet.password(),
	},
};

module.exports = dataFaker;
