const { readSecret } = require('../../config/jwt'),
	fs = require('fs'),
	path = require('path'),
	{ expect, should } = require('chai'),
	assert = require('assert'),
	{ parse } = require('dotenv'),
	{ stringify } = require('envfile'),
	rimraf = require('rimraf');

let access;
const fileTest = path.join(__dirname, '../../config/key/access.txt');
describe('Test return JWT secret', () => {
	before(() => {
		access = readSecret('access');
	});
	after(() => fs.writeFileSync(fileTest, access));
	describe('Read file', () => {
		it('True => return access key', () => {
			expect(readSecret('access')).equal(fs.readFileSync(fileTest, 'utf-8'));
		});
		it('if file length = 0 => throw new Error', () => {
			fs.writeFileSync(fileTest, '');
			assert.throws(() => readSecret('access'), Error);
		});
		it('if no file  => throw new Error', () => {
			fs.unlinkSync(fileTest);
			assert.throws(() => readSecret('access'), Error);
		});
	});
});
