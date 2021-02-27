const { expect, should } = require('chai'),
	assert = require('assert'),
	{ get } = require('../../config/index'),
	fs = require('fs'),
	{ parse } = require('dotenv'),
	{ stringify } = require('envfile'),
	path = require('path'),
	rimraf = require('rimraf');

describe('Test check file .env', () => {
	const env = parse(fs.readFileSync('.env')); //for undo .env
	let test_env; //for test
	beforeEach(() => (test_env = parse(fs.readFileSync('.env'))));
	afterEach(() => fs.writeFileSync('.env', stringify(env)));

	describe('Test NODE_ENV', () => {
		it('if node_env is true => return node_env ', () => {
			test_env.NODE_ENV = 'prod';
			fs.writeFileSync('.env', stringify(test_env));
			expect(get('NODE_ENV')).equal(test_env.NODE_ENV);
		});
		it('if no node_env => dev', () => {
			delete test_env.NODE_ENV;
			fs.writeFileSync('.env', stringify(test_env));
			expect(get('NODE_ENV')).equal('dev');
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
			expect(get('PORT')).equal(1234);
		});
		it('if no port =>  return 8080', () => {
			delete test_env.PORT;
			fs.writeFileSync('.env', stringify(test_env));
			expect(get('PORT')).equal(8080);
		});
		it('if port is error => throw new Error', () => {
			test_env.PORT = 'test';
			fs.writeFileSync('.env', stringify(test_env));
			assert.throws(() => get('NODE_ENV'), Error('ENV validation error: "PORT" must be a number'));
		});
	});
	describe('Test URL', () => {
		it('if url is true => return url', () => {
			test_env.URL = 'http://localhost';
			fs.writeFileSync('.env', stringify(test_env));
			expect(get('URL')).equal('http://localhost');
		});
		it('if no url =>  throw new Error', () => {
			delete test_env.URL;
			fs.writeFileSync('.env', stringify(test_env));
			assert.throws(() => get('URL'), Error('ENV validation error: "URL" is required'));
		});
		it('if url is error => throw new Error', () => {
			test_env.URL = 'test';
			fs.writeFileSync('.env', stringify(test_env));
			assert.throws(
				() => get('URL'),
				Error('ENV validation error: "URL" must be a valid uri with a scheme matching the https? pattern')
			);
		});
		describe('Test DEBUG', () => {
			it('if debug is true => return debug', () => {
				test_env.DEBUG = true;
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('DEBUG')).equal(true);
			});
			it('if no debug =>  return false', () => {
				delete test_env.DEBUG;
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('DEBUG')).equal(false);
			});
			it('if debug is error => throw new Error', () => {
				test_env.DEBUG = 'test';
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(() => get('DEBUG'), Error('ENV validation error: "DEBUG" must be a boolean'));
			});
		});
		describe('Test MONGO_URI', () => {
			it('if mongo_uri is true => return mongo_uri', () => {
				test_env.MONGO_URI = 'mongodb://localhost:27017/test';
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('MONGO_URI')).equal('mongodb://localhost:27017/test');
			});
			it('if no mongo_uri =>  return default', () => {
				delete test_env.MONGO_URI;
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('MONGO_URI')).equal('mongodb://localhost:27017/Project1');
			});
			it('if mongo_uri is error => throw new Error', () => {
				test_env.MONGO_URI = 'test';
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(
					() => get('MONGO_URI'),
					Error('ENV validation error: "MONGO_URI" with value "test" fails to match the required pattern: /^mongodb/')
				);
			});
		});
		describe('Test SMTP_USER', () => {
			it('if smtp_user is true => return smtp_user', () => {
				test_env.SMTP_USER = 'nguyenvanvy1999@gmail.com';
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('SMTP_USER')).equal('nguyenvanvy1999@gmail.com');
			});
			it('if smtp_user is error => throw new Error', () => {
				test_env.SMTP_USER = 'test';
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(() => get('SMTP_USER'), Error('ENV validation error: "SMTP_USER" must be a valid email'));
			});
			it('if no smtp_user and no sendgrid_api_key =>  throw new Error', () => {
				delete test_env.SMTP_USER;
				delete test_env.SMTP_PASSWORD;
				delete test_env.SENDGRID_API_KEY;
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(
					() => get('URL'),
					Error('ENV validation error: "value" must contain at least one of [SMTP_USER, SENDGRID_API_KEY]')
				);
			});
		});
		describe('Test SMTP_PASSWORD, SENDGRID_API_KEY, WEBTOKEN_SECRET_KEY', () => {
			it('if is string => return', () => {
				test_env.SMTP_PASSWORD = 1234;
				test_env.SENDGRID_API_KEY = 'abcd';
				test_env.WEBTOKEN_SECRET_KEY = 'test';
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('SMTP_PASSWORD')).equal('1234');
				expect(get('SENDGRID_API_KEY')).equal('abcd');
				expect(get('WEBTOKEN_SECRET_KEY')).equal('test');
			});
			it('if  smtp_user and no smtp_password =>  throw new Error', () => {
				test_env.SMTP_USER = 'nguyenvanvy1999@gmail.com';
				delete test_env.SMTP_PASSWORD;
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(
					() => get('SMTP_PASSWORD'),
					Error('ENV validation error: "value" contains [SMTP_USER] without its required peers [SMTP_PASSWORD]')
				);
			});
		});
		describe('Test WEBTOKEN_EXP', () => {
			it('if webtoken_exp is true => return webtoken_exp', () => {
				test_env.WEBTOKEN_EXP = 1000;
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('WEBTOKEN_EXP')).equal(1000);
			});
			it('if no webtoken_exp =>  return default', () => {
				delete test_env.WEBTOKEN_EXP;
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('WEBTOKEN_EXP')).equal(1800);
			});
			it('if webtoken_exp is error => throw new Error', () => {
				test_env.WEBTOKEN_EXP = 'test';
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(() => get('WEBTOKEN_EXP'), Error('ENV validation error: "WEBTOKEN_EXP" must be a number'));
			});
		});
		describe('Test SALT', () => {
			it('if salt is true => return salt', () => {
				test_env.SALT = 6;
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('SALT')).equal(6);
			});
			it('if no salt =>  return default', () => {
				delete test_env.SALT;
				fs.writeFileSync('.env', stringify(test_env));
				expect(get('SALT')).equal(5);
			});
			it('if salt is error => throw new Error', () => {
				test_env.SALT = 'test';
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(() => get('SALT'), Error('ENV validation error: "SALT" must be a number'));
				test_env.SALT = 2; //<4
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(() => get('SALT'), Error('ENV validation error: "SALT" must be greater than or equal to 4'));
				test_env.SALT = 100; //>15
				fs.writeFileSync('.env', stringify(test_env));
				assert.throws(() => get('SALT'), Error('ENV validation error: "SALT" must be less than or equal to 15'));
			});
		});
		describe('Test PATH', () => {
			it('if folder is exits => return path', () => {
				expect(get('PATH')).equal(path.join(__dirname, '../../uploads'));
			});
			it('if no folder => return path and create new folder ', () => {
				const folder = get('PATH');
				expect(folder).equal(path.join(__dirname, '../../uploads')); //check path is true
				rimraf.sync(folder); //delete folder
				fs.existsSync(folder);
				expect(fs.existsSync(folder)).equal(false); //check folder is delete
				get('PATH');
				expect(fs.existsSync(folder)).equal(true); //check folder is create
			});
		});
	});
});
