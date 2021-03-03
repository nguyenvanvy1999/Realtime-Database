const { expect, should } = require('chai'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	User = require('../../models/user'),
	{ open, clearData, close } = require('../../config/mongo'),
	app = require('../../index'),
	fs = require('fs'),
	faker = require('faker'),
	{ parse } = require('dotenv'),
	{ stringify } = require('envfile'),
	{ seedAdmin, seedMany, seedUser } = require('../mocks/seed');

chai.use(chaiHttp);
const env = parse(fs.readFileSync('.env'));
before(async () => {
	let test_env = env;
	test_env.DEBUG = true;
	fs.writeFileSync('.env', stringify(test_env)); //Set DEBUG env for test
	await open();
});
beforeEach(async () => await clearData());
after(async () => {
	await clearData();
	await close();
	fs.writeFileSync('.env', stringify(env));
});
describe('Test User E2E', () => {
	describe('/POST signup', () => {
		const body = {
			email: 'seeduser@example.com',
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			password: 'password',
			confirmPassword: 'password',
		};
		it('OK => Create new user and send verify mail', async () => {
			const result = await chai.request(app).post('/user/signup').send(body);
			expect(result.statusCode).equal(200);
			const user = await User.findOne({ email: body.email });
			expect([user.email, user.firstName, user.lastName]).eql([body.email, body.firstName, body.lastName]);
		});
		it('Validate data failed => return APIError', async () => {
			const bodyErr = []; //array of test case
			for (const index in body) {
				let clone = Object.assign({}, body);
				delete clone[index];
				bodyErr.push(clone);
			} //missing a value
			let test = Object.assign({}, body);
			test.email = 'test123';
			bodyErr.push(test); //email failed
			test = Object.assign({}, body);
			test.password = test.confirmPassword = '1';
			bodyErr.push(test); //password < 4
			for (let i = 0; i < bodyErr.length; i++) {
				const result = await chai.request(app).post('/user/signup').send(bodyErr[i]);
				expect(result.statusCode).equal(500);
				expect(result.body.name).equal('APIError');
			}
		});
		it('Email has been exist => return APIError', async () => {
			await chai.request(app).post('/user/signup').send(body);
			const result = await chai.request(app).post('/user/signup').send(body); //Email has ben exist
			expect(result.statusCode).equal(400);
			expect(result.body.name).equal('APIError');
		});
	});
	describe('Test POST/ login', () => {
		let admin;
		beforeEach(async () => {
			admin = await seedAdmin();
		});
		afterEach(async () => await clearData());
		it('If true => return token', async () => {
			//const admin = await seedAdmin();
			const body = {
				email: admin.email,
				password: 'password',
			};
			const result = await chai.request(app).post('/user/login').send(body);
			expect(result.statusCode).equal(200);
			expect(result.body).to.have.property('accessToken');
			expect(result.body).to.have.property('refreshToken');
		});
		it('Validate data failed => return APIError', async () => {
			let bodyErr = [];
			const body = {
				email: admin.email,
				password: 'password',
			};
			for (const index in body) {
				let clone = Object.assign({}, body);
				delete clone[index];
				bodyErr.push(clone);
			} //missing a value
			let test = Object.assign({}, body);
			test.email = 'test123';
			bodyErr.push(test); //email failed
			test = Object.assign({}, body);
			test.password = test.confirmPassword = '1';
			bodyErr.push(test); //password < 4
			for (let i = 0; i < bodyErr.length; i++) {
				const result = await chai.request(app).post('/user/login').send(bodyErr[i]);
				expect(result.statusCode).equal(500);
				expect(result.body.name).equal('APIError');
			}
		});
		it('Email wrong => return APIError', async () => {
			const body = {
				email: 'wrongemail@example.com',
				password: 'password',
			};
			const result = await chai.request(app).post('/user/login').send(body);
			expect(result.statusCode).equal(500);
			expect(result.body.name).equal('APIError');
		});
		it('Password wrong => return APIError', async () => {
			const body = {
				email: admin.email,
				password: 'wrongpassword',
			};
			const result = await chai.request(app).post('/user/login').send(body);
			expect(result.statusCode).equal(500);
			expect(result.body.name).equal('APIError');
		});
	});
});
