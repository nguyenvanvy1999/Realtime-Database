const { expect, should } = require('chai'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	User = require('../../models/user'),
	{ open, clearData, close } = require('../../config/mongo'),
	{ APIError } = require('../../helpers/error'),
	app = require('../../index'),
	fs = require('fs'),
	{ parse } = require('dotenv'),
	{ stringify } = require('envfile'),
	dataFaker = require('../mocks/data');

chai.use(chaiHttp);
const env = parse(fs.readFileSync('.env'));
before(async () => {
	let test_env = env;
	test_env.DEBUG = true;
	fs.writeFileSync('.env', stringify(test_env)); //Set DEBUG env for test
	await open();
});

after(async () => {
	await clearData();
	await close();
	fs.writeFileSync('.env', stringify(env));
});
describe('Test User E2E', () => {
	describe('/POST signup', () => {
		const body = { ...dataFaker.signup, confirmPassword: dataFaker.signup.password };
		it('OK => Create new user and send verify mail', async () => {
			const result = await chai.request(app).post('/user/signup').send(body);
			expect(result.statusCode).equal(200);
			const user = await User.findOne({ email: body.email });
			expect([user.email, user.firstName, user.lastName]).eql([body.email, body.firstName, body.lastName]);
		});
		it('Validate data failed => return APIError', async () => {
			//
			let result = []; //array of result.body
			let bodyErr = []; //array of test case
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
				const result = await await chai.request(app).post('/user/signup').send(bodyErr[i]);
				expect(result.statusCode).equal(500);
				expect(result.body.name).equal('APIError');
			}
		});
		it('Email has been exist => return APIError', async () => {
			const result = await chai.request(app).post('/user/signup').send(body); //Email has ben exist
			expect(result.statusCode).equal(400);
			expect(result.body.name).equal('APIError');
		});
	});
});
