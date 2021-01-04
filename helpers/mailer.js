const nodeMailer = require('nodemailer');
const mailConfig = require('../config/constant/mail').mailConfig;

function newMailOption(from, to, subject, text) {
    let mailOption = {
        from: from,
        to: to,
        subject: subject,
        text: text,
    };
    return mailOption;
}

async function sendMail(mailOption, next) {
    return new Promise((resolve, reject) => {
        try {
            const transporter = nodeMailer.createTransport(mailConfig);
            const mail = transporter.sendMail(mailOption);
            return resolve(mail);
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    newMailOption: newMailOption,
    sendMail: sendMail,
};