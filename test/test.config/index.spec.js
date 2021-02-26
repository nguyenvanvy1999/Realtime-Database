const { expect, should } = require('chai'),
	assert = require('assert'),
	{ get } = require('../../config/index'),
	fs = require('fs'),
	{ parse } = require('dotenv'),
	{ stringify } = require('envfile');

describe('Test check file .env', () => {
	const env = parse(fs.readFileSync('.env')); //for undo .env
	let test_env; //for test
	beforeEach(() => (test_env = parse(fs.readFileSync('.env'))));
	afterEach(() => fs.writeFileSync('.env', stringify(env)));
	describe('Test NODE_ENV', () => {
		it('if node_env is true => return node_env ', () => {
			test_env.NODE_ENV = 'prod';
			fs.writeFileSync('.env', stringify(test_env));
			const result = get('NODE_ENV');
			expect(result).equal(test_env.NODE_ENV);
		});
		it('if no node_env => dev', () => {
			delete test_env.NODE_ENV;
			fs.writeFileSync('.env', stringify(test_env));
			const result = get('NODE_ENV');
			expect(result).equal('dev');
		});
		it('if node_env is error => throw new Error', () => {
			test_env.NODE_ENV = 'test';
			fs.writeFileSync('.env', stringify(test_env));
			assert.throws(() => get('NODE_ENV'), Error('ENV validation error: "NODE_ENV" must be one of [dev, prod]'));
		});
	});
	describe('Test PORT', () => {
		it('if port is true => return port', () => {
			test_env.PORT = '1234';
			fs.writeFileSync('.env', stringify(test_env));
			const result = get('PORT');
			expect(result).equal(1234);
		});
		it('if no port =>  return 8080', () => {
			delete test_env.PORT;
			fs.writeFileSync('.env', stringify(test_env));
			const result = get('PORT');
			expect(result).equal(8080);
		});
		it('if port is false => throw new Error', () => {
			test_env.PORT = 'test';
			fs.writeFileSync('.env', stringify(test_env));
			assert.throws(() => get('NODE_ENV'), Error('ENV validation error: "PORT" must be a number'));
		});
	});
});
