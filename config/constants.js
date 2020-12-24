const config = {
    sever: {
        host: 'localhost',
        port: 8080,
    },
    mongo: {
        host: 'mongodb://localhost:27017/Project1',
    },
    HTTP_STATUS_CODE: {
        SUCCESS: {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            NON_AUTHORITATIVE_INFORMATION: 203,
            NO_CONTENT: 204,
            RESET_CONTENT: 205,
            PARTIAL_CONTENT: 206,
            MULTI_STATUS: 207,
            ALREADY_REPORTED: 208,
            IM_USED: 209,
        },
        REDIRECTION: {
            MULTIPLE_CHOICES: 300,
            MOVED_PERMITTED: 301,
            FOUND: 302,
            SEE_OTHER: 303,
            NOT_MODIFIED: 304,
            USE_PROXY: 305,
            SWITCH_PROXY: 306,
            TEMPORARY__REDIRECTION: 307,
            PERMANENT__REDIRECTION: 308,
        },
        ERROR: {
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAY_REQUIRED: 402,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
        },
        SERVER_ERROR: {
            INTERNAL_SERVER_ERROR: 500,
            NOT_IMPLEMENTED: 501,
            BAD_GATEWAY: 502,
            SERVICE_UNAVAILABLE: 503,
        },
    },
    jwt: {
        accessSecret: 'access',
        accessLife: 900,
        refreshSecret: 'refresh',
        refreshLife: 86400,
        deviceSecret: 'device',
        verifySecret: 'verify',
        verifyLife: 900,
    },
    nodeMailer: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'nguyenvanvy619619@gmail.com',
            pass: '619619vyvy',
        },
    },
    multer: {
        maxSize: 1024 * 1024 * 5,
    },
};

module.exports = config;