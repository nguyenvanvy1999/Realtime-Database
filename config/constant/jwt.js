const jwtConfig = {
    accessSecret: 'access',
    accessLife: 900,
    refreshSecret: 'refresh',
    refreshLife: 86400,
    deviceSecret: 'device',
    verifySecret: 'verify',
    verifyLife: 900,
};
module.exports = jwtConfig;