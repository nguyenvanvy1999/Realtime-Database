const passportConfig = {
    local: {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
};

module.exports = passportConfig;