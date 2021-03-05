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
	describe('POST /signup', () => {
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
			let test = { ...body, email: '123' };
			bodyErr.push(test); //email failed
			test = { ...body, password: '123', confirmPassword: '123' };
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
	describe('POST /login', () => {
		let admin, body;
		beforeEach(async () => {
			admin = await seedAdmin();
			body = {
				email: admin.email,
				password: 'password',
			};
		});

		afterEach(async () => await clearData());
		it('If true => return token', async () => {
			const result = await chai.request(app).post('/user/login').send(body);
			expect(result.statusCode).equal(200);
			expect(result.body).to.have.property('accessToken');
			expect(result.body).to.have.property('refreshToken');
		});
		it('Validate data failed => return APIError', async () => {
			let bodyErr = [];
			for (const index in body) {
				let clone = Object.assign({}, body);
				delete clone[index];
				bodyErr.push(clone);
			} //missing a value
			let test = { ...body, email: 'test123' };
			bodyErr.push(test); //email failed
			test = { ...body, password: '12' };
			bodyErr.push(test); //password < 4
			for (let i = 0; i < bodyErr.length; i++) {
				const result = await chai.request(app).post('/user/login').send(bodyErr[i]);
				expect(result.statusCode).equal(500);
				expect(result.body.name).equal('APIError');
			}
		});
		it('Email wrong => return APIError', async () => {
			const bodyErr = { ...body, email: 'wrongemail@example.com' };
			const result = await chai.request(app).post('/user/login').send(bodyErr);
			expect(result.statusCode).equal(500);
			expect(result.body.name).equal('APIError');
		});
		it('Password wrong => return APIError', async () => {
			const bodyErr = { ...body, password: 'wrongpassword' };
			const result = await chai.request(app).post('/user/login').send(bodyErr);
			expect(result.statusCode).equal(500);
			expect(result.body.name).equal('APIError');
		});
	});
	describe('GET / (user profile)', () => {
		it('Is login => return user profile', async () => {
			const admin = await await seedAdmin();
			const body = { email: admin.email, password: 'password' };
			const login = await chai.request(app).post('/user/login').send(body);
			const cookie = login.headers['set-cookie'].pop().split(';')[0]; //get cookie and save
			const result = await chai.request(app).get('/user').set('Cookie', cookie); //send cookie to auth
			const { roles, email, firstName, lastName, isActive, _id } = admin;
			expect({ ...result.body }).eql({ roles, email, firstName, lastName, isActive, _id: _id.toString() });
		});
		it('No login => return APIError', async () => {
			const result = await chai.request(app).get('/user');
			expect(result.statusCode).equal(400);
			expect(result.body.name).equal('APIError');
		});
	});
	describe('PATH / (edit user profile)', () => {
		let admin, token;
		beforeEach(async () => {
			admin = await seedAdmin();
			const body = {
				email: admin.email,
				password: 'password',
			};
			login = await chai.request(app).post('/user/login').send(body);
			token = login.body.accessToken;
		});
		it('Is true => edit user profile', async () => {
			const body = {
				firstName: 'Nguyen',
				lastName: 'Van Vy',
			};
			const result = await chai.request(app).patch('/user').set('token', token).send(body);
			expect(result.statusCode).equal(200);
			expect(result.body).to.have.property('accessToken');
			expect(result.body).to.have.property('refreshToken');
			const user = await User.findOne({ email: admin.email });
			expect([user.firstName, user.lastName]).eql([body.firstName, body.lastName]);
		});
		it('Validate error => return APIError', async () => {
			const bodyErr = [];
			let test = { firstName: 'Nguyen' };
			bodyErr.push(test);
			test = { lastName: 'Van Vy' };
			bodyErr.push(test);
			for (let i = 0; i < bodyErr.length; i++) {
				const result = await chai.request(app).patch('/user').set('token', token).send(bodyErr[i]);
				expect(result.statusCode).equal(500);
				expect(result.body.name).equal('APIError');
			}
		});
		it('If token error => throw new APIError', async () => {
			const body = { firstName: 'Nguyen', lastName: 'Van Vy' };
			const errToken =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
			const result = await chai.request(app).patch('/user').set('token', errToken).send(body);
			expect(result.statusCode).equal(400);
			expect(result.body.name).equal('APIError');
		});
	});
});
