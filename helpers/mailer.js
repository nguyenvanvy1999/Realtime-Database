const nodeMailer = require('nodemailer'),
    mailConfig = require('../config/constant/mail').mailConfig(),
    { APIError } = require('./error');

async function sendMail(setting) {
    try {
        const transporter = nodeMailer.createTransport(mailConfig);
        return await transporter.sendMail(setting);
    } catch (error) {
        throw new APIError({ message: error.message });
    }
}

function verifyEmail(token, req) {
    const mailOptions = {
        to: req.user.email,
        from: 'nguyenvanvy1999@gmail.com',
        subject: 'Please verify your email address on DataCenter',
        text: `Thank you for registering with DataCenter.\n\n
This verify your email address please click on the following link, or paste this into your browser:\n\n
http://${req.headers.host}/account/verify/${token}\n\n
\n\n
Thank you!`,
    };
    return mailOptions;
}

function resetPasswordMail(user) {
    const mailOptions = {
        to: user.email,
        from: 'nguyenvanvy1999@gmail.com',
        subject: 'Your DataCenter password has been changed',
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
    };
    return mailOptions;
}

function forgotPasswordMail(user, req) {
    const token = user.passwordResetToken;
    const mailOptions = {
        to: user.email,
        from: 'hackathon@starter.com',
        subject: 'Reset your password on Hackathon Starter',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
	Please click on the following link, or paste this into your browser to complete the process:\n\n
	http://${req.headers.host}/reset/${token}\n\n
	If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    return mailOptions;
}
module.exports = { sendMail, verifyEmail, forgotPasswordMail, resetPasswordMail };