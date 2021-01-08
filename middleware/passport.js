const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/user');
const bcryptHelper = require('../helpers/bcrypt');
const passportConfig = require('../config/constant/passport');
const HTTP_STATUS_CODE = require('../config/constant/http');
const { APIError } = require('../helpers/ErrorHandler');
const signUpStrategy = new LocalStrategy(
    passportConfig.local,
    async(req, email, password, done) => {
        try {
            let user = await UserService.getUserByEmail(email);
            if (user) {
                throw new APIError({ message: 'This email already exists' });
            } else {
                const username = req.body.username;
                const newUser = UserService.newUser(email, username, password);
                const user = await UserService.insert(newUser);
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }
);
const signInStrategy = new LocalStrategy(
    passportConfig.local,
    async(req, email, password, done) => {
        try {
            const user = await UserService.getUserByEmail(email);
            if (!user) {
                throw new APIError({ message: 'Email wrong' });
            }
            let isPassword = await bcryptHelper.compare(password, user.password);
            if (!isPassword) {
                throw new APIError({ message: 'Password wrong' });
            }
            if (user.isActive === false) {
                throw new APIError({ message: 'Active account first' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', signUpStrategy);
    passport.use('local-signin', signInStrategy);
};