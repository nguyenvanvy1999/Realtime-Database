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
		it('OK => Create new user and send verify mail', async () => {
			const body = { ...dataFaker.signup, confirmPassword: dataFaker.signup.password };
			const result = await chai.request(app).post('/user/signup').send(body);
			expect(result.statusCode).equal(200);
			const user = await User.findOne({ email: body.email });
			expect([user.email, user.firstName, user.lastName]).eql([body.email, body.firstName, body.lastName]);
		});
		it('Validate data failed => return APIError', async () => {
			const body = dataFaker.signup;
			const result = await chai.request(app).post('/user/signup').send(body);
			expect(result.statusCode).equal(500);
			expect(result.body.name).equal('APIError');
		});
	});
});
