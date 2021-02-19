require('dotenv').config();
const nodemailerSendgrid = require('nodemailer-sendgrid');
const mailConfig = () => {
    let transportConfig;
    if (process.env.SENDGRID_API_KEY) {
        transportConfig = nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY,
        });
    } else {
        transportConfig = {
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        };
    }
    console.log(transportConfig);
    return transportConfig;
};
const mailOption = {
    subject: 'Email verify send from NodeJS server',
    text: 'You was this email to signup in AppChat. This mail to verify your account.\n Token expired at 15 minute. This is your token:  \n',
    text2: '\n Go to: http://localhost:8080/user/verify  to active your account',
};
module.exports = { mailConfig, mailOption };