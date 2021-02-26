const nodemailerSendgrid = require('nodemailer-sendgrid'),
	{ get } = require('./index');

const grid = get('SENDGRID_API_KEY'); //check if has using grid_api_mail
const mailConfig = () => {
	let transportConfig;
	if (grid) {
		transportConfig = nodemailerSendgrid({
			apiKey: grid,
		});
	} else {
		transportConfig = {
			service: 'gmail',
			auth: {
				user: get('SMTP_USER'),
				pass: get('SMTP_PASSWORD'),
			},
		};
	}
	return transportConfig;
};

module.exports = { mailConfig };
