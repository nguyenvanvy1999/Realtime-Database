const mongoose = require('mongoose'),
    mongoConfig = require('../../constant/mongo'),
    { success, error, info, warning } = require('log-symbols');

// ________________________________________________

async function connect() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(mongoConfig.host, mongoConfig.setting);
        return console.log(`${success} ${mongoConfig.host}`);
    } catch (err) {
        return console.log(`${error} ${mongoConfig.host}`);
    }
}

async function disconnect() {
    try {
        await mongoose.disconnect();
        return console.log(`${success} Disconnect`);
    } catch (err) {
        return console.log(`${error} Disconnect`);
    }
}

module.exports = { connect, disconnect };