const nodeMailer = require('nodemailer');
const config = require('../config/constants');

const transporter = nodeMailer.createTransport(config.nodeMailer);

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