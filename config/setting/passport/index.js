//FIXME:passport local

const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user');
const UserService = require('../../../services/user');
const bcryptHelper = require('../../../helpers/bcrypt');
const signUpStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async(req, email, username, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                return done(null, false, req.flash('Email wrong'));
            } else {
                const newUser = UserService.newUser(email, username, password);
                const user = await UserService.insert(newUser);
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }
);
const signInStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async(req, email, password, done) => {
        try {
            const user = await UserService.activeAccount(email);
            if (!user) {
                return done(null, false, req.flash('Email wrong'));
            }
            if (!bcryptHelper.compare(password, user.password)) {
                return done(null, false, req.flash('Email wrong'));
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = function(passport) {
    us;
    passport.use('local-signup', signUpStrategy);
    passport.use('local-login', signInStrategy);
};