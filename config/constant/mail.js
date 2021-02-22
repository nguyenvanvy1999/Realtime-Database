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
    return transportConfig;
};

module.exports = { mailConfig };