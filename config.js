const config = {
    server: {
        host: "localhost",
        port: 8080,
    },
    db: {
        dbHost: "mongodb://localhost:27017/Shop_online",
    },
    getUrl: function() {
        return "http://" + this.server.host + ":" + this.server.port + "/";
    },
    jwt: {
        accessToken: {
            tokenSecret: "accessToken",
            tokenLife: 900, // 15 minutes
        },
        refreshToken: {
            tokenSecret: "refreshToken",
            tokenLife: 86400, // 1 day
        },
    },
    session: {
        secret: "sessionSecret",
    },
    passport: {
        secret: "passportSecret",
    },
};
// ________________________________________________
module.exports = config;