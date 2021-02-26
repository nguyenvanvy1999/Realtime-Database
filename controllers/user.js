const UserService = require('./../services/user.js'),
	jwtHelper = require('../helpers/jwt'),
	{ APIError } = require('../helpers/error'),
	bcryptHelper = require('../helpers/bcrypt'),
	{ sendMail, verifyEmail, resetPasswordMail } = require('../helpers/mailer'),
	jwtConfig = require('../config/jwt'),
	User = require('../models/user');
// ________________________________________________

async function postSignIn(req, res, next) {
	try {
		const user = req.user;
		const token = await jwtHelper.returnToken(user);
		return res.status(200).send(token);
	} catch (error) {
		next(error);
	}
}

async function postSignUp(req, res, next) {
	try {
		const newUser = UserService.newUser(req.body);
		const token = await jwtHelper.generateToken(newUser, jwtConfig.VERIFY, jwtConfig.SHORT_TIME);
		await UserService.insert(newUser);
		const config = verifyEmail(token, req);
		await sendMail(config);
		return res.status(200).send({ message: 'Check your email and verify account!' });
	} catch (error) {
		next(error);
	}
}
async function verifyAccount(req, res, next) {
	try {
		const token = req.query.token;
		const decoded = await jwtHelper.verifyToken(token, jwtConfig.VERIFY);
		await User.findOneAndUpdate({ email: decoded.data.email }, { isActive: true });
		return res.status(200).send({ message: 'Active successfully !' });
	} catch (error) {
		next(error);
	}
}

async function editUserProfile(req, res, next) {
	try {
		const { email } = req.user;
		const { firstName, lastName } = req.body;
		const newUser = await User.findOneAndUpdate({ email }, { firstName, lastName }, { new: true });
		const token = await jwtHelper.returnToken(newUser);
		return res.status(200).send({ token });
	} catch (error) {
		next(error);
	}
}

async function editPassword(req, res, next) {
	try {
		const { email } = req.user;
		let { password } = req.body;
		const user = await User.findOne({ email });
		const isExits = await bcryptHelper.compare(password, user.password); //check new password has been change?
		if (isExits) throw new APIError({ message: 'Password has exits.Please choose new password' });
		password = await bcryptHelper.hash(password);
		await User.findOneAndUpdate({ email }, { password });
		const config = resetPasswordMail(req.user);
		await sendMail(config);
		return res.status(200).send('Password has been update');
	} catch (error) {
		next(error);
	}
}

async function getForgotPassword(req, res, next) {
	try {
		const { email } = req.body;
		const user = await User.findOne(email);
		if (!user) throw new APIError({ message: 'No user found!' });
		const token = await jwtHelper.generateToken(user, jwtConfig.PASSWORD, jwtConfig.SHORT_TIME);
		const config = forgotPasswordMail(token, req);
		await sendMail(config);
		return res.status(200).send('Check your mail to generate new password');
	} catch (error) {
		next(error);
	}
}

async function postForgotPassword(req, res, next) {
	try {
		const token = req.query.token;
		let { password } = req.body;
		password = await bcryptHelper.hash(password);
		const decoded = await jwtHelper.verifyToken(token, jwtConfig.PASSWORD);
		await User.findOneAndUpdate({ email: decoded.data.email }, { password });
		return res.status(200).send('Success ! Please login to using');
	} catch (error) {
		next(error);
	}
}
async function deleteUser(req, res, next) {
	try {
		const { email } = req.user;
		await User.findOneAndDelete({ email });
		return res.status(200).send('Delete Successfully!');
	} catch (error) {
		next(error);
	}
}
async function getUserProfile(req, res, next) {
	try {
		return res.status(200).send(req.user);
	} catch (error) {
		next(error);
	}
}

async function refreshToken(req, res, next) {
	try {
		const refreshToken = req.body.refreshToken || req.query.refreshToken || req.header['refreshToken'];
		if (refreshToken) {
			const decoded = await jwtHelper.verifyToken(refreshToken, jwtConfig.REFRESH);
			if (decoded) {
				const accessToken = await jwtHelper.generateToken(decoded.data, jwtConfig.ACCESS, jwtConfig.SHORT_TIME);
				return res.status(200).send({
					accessToken: accessToken,
					refreshToken: refreshToken,
				});
			}
			throw new APIError({ message: 'Refresh token wrong' });
		}
		throw new APIError({ message: 'No token provided !' });
	} catch (error) {
		next(error);
	}
}
async function searchUser(req, res, next) {
	try {
		const user = await UserService.search(req.body);
		return res.status(200).send({ length: user.length, users: user });
	} catch (error) {
		next(error);
	}
}
// ________________________________________________
module.exports = {
	postSignIn,
	postSignUp,
	editUserProfile,
	editPassword,
	getForgotPassword,
	postForgotPassword,
	deleteUser,
	getUserProfile,
	refreshToken,
	verifyAccount,
	searchUser,
};
