const config = {
    sever: {
        host: "localhost",
        port: 8080,
    },
    mongo: {
        host: "mongodb://localhost:27017/Project1",
    },
    HTTP_STATUS_CODE: {
        SUCCESS: {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            NON_AUTH: 203,
            NO_CONTENT: 204,
            RESET_CONTENT: 205,
        },
        REDIRECTION: {},
        ERROR: {
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAY_REQUIRED: 402,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
        },
        SERVER_ERROR: {},
    },
    jwt: {
        accessSecret: "access",
        accessLife: 900,
        refreshSecret: "refresh",
        refreshLife: 86400,
        deviceSecret: "device",
        verifySecret: "verify",
        verifyLife: 900,
    },
    nodeMailer: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "nguyenvanvy619619@gmail.com",
            pass: "619619vyvy",
        },
    },
};

module.exports = config;