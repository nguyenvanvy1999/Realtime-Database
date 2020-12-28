const nodeMailer = require('nodemailer');
const mailConfig = require('../config/constant/mail').mailConfig;

const transporter = nodeMailer.createTransport(mailConfig);

function newMailOption(from, to, subject, text) {
    let mailOption = {
        from: from,
        to: to,
        subject: subject,
        text: text,
    };
    return mailOption;
}

function sendMail(mailOption) {
    return new Promise((resolve, reject) => {
        try {
            let result = transporter.sendMail(mailOption);
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    newMailOption: newMailOption,
    sendMail: sendMail,
};