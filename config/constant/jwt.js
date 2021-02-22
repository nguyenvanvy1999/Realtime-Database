const JwtConfig = {
    ACCESS: {
        SECRET: 'access', //jwt return after login
        LIFE: 900,
    },
    REFRESH: {
        SECRET: 'refresh', //jwt to refresh access token
        LIFE: 86400,
    },
    VERIFY: {
        SECRET: 'verify', //jwt to verify account
        LIFE: 900,
    },
    DEVICE: {
        SECRET: 'device',
        LIFE: 86400,
    },
    PASSWORD: {
        SECRET: 'password', //jwt for forgot password
        LIFE: 86400,
    },
};
module.exports = JwtConfig;