const LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user'),
	{ APIError } = require('../helpers/error');

const Local = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	},
	async (req, email, password, done) => {
		try {
			const user = await User.findOne({ email });
			if (!user) return done({ message: 'Incorrect email' });
			const isPassword = await user.comparePassword(password);
			if (!isPassword) done({ message: 'Incorrect password' });
			if (!user.isActive) done({ message: 'Account not active' });
			return done(null, user);
		} catch (error) {
			return done(error, null);
		}
	}
);

module.exports = function (passport) {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser(function (_id, done) {
		User.findById(_id, (err, user) => {
			const result = {
				...user.toObject(),
				createdAt: undefined,
				updatedAt: undefined,
				password: undefined,
				__v: undefined,
			};
			done(err, result);
		});
	});
	passport.use('local', Local);
};
