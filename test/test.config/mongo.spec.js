const { open, close } = require('../../config/mongo'),
	{ expect } = require('chai'),
	mongoose = require('mongoose');

describe('Test mongo config', () => {
	it('Test function connect ', async () => {
		expect(mongoose.connection.readyState).equal(1);
	});
	it('Test function disconnect', async () => {
		await close(); //close db to test
		expect(mongoose.connection.readyState).equal(0);
		await open(); //open db to next test
	});
});
