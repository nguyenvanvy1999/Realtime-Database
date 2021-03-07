const { mailConfig } = require('../../config/mail'),
	nodemailerSendgrid = require('nodemailer-sendgrid'),
	{ get } = require('../../config/index'),
	fs = require('fs'),
	{ expect } = require('chai'),
	{ parse } = require('dotenv'),
	{ stringify } = require('envfile');

describe('Test function get mail config', () => {
	let test_env;
	const env = parse(fs.readFileSync('.env'));
	before(() => (test_env = parse(fs.readFileSync('.env'))));
	after(() => fs.writeFileSync('.env', stringify(env)));
	it('If using sendgrid mail => return sendgrid config', () => {
		test_env.SENDGRID_API_KEY = 'test key';
		fs.writeFileSync('.env', stringify(test_env));
		expect(mailConfig()).eql(nodemailerSendgrid({ apiKey: 'test key' }));
	});
	it('If no using sendgrid mail => return smtp config', () => {
		delete test_env.SENDGRID_API_KEY;
		fs.writeFileSync('.env', stringify(test_env));
		const result = {
			service: 'gmail',
			auth: {
				user: get('SMTP_USER'),
				pass: get('SMTP_PASSWORD'),
			},
		};
		expect(mailConfig()).eql(result);
	});
});
