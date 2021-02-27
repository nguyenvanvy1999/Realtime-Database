const { readSecret, jwtConfig } = require('../../config/jwt'),
	fs = require('fs'),
	path = require('path'),
	{ expect } = require('chai'),
	assert = require('assert');

let access;
const fileTest = path.join(__dirname, '../../config/key/access.txt');
describe('Test return JWT secret', () => {
	before(() => {
		access = readSecret('access');
	});
	after(() => fs.writeFileSync(fileTest, access));
	describe(' Test read secret key', () => {
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
	describe('Test jwtConfig', () => {
		it('jwtConfig should defined', () => {
			expect(jwtConfig).to.exist;
		});
		it('Time of secret is true', () => {
			expect(jwtConfig.LONG_TIME).equal(86400);
			expect(jwtConfig.SHORT_TIME).equal(900);
		});
	});
});
