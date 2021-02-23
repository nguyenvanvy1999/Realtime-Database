const mongoose = require('mongoose'),
    mongoConfig = require('../../constant/mongo'),
    { Mockgoose } = require('mockgoose'),
    { success, error } = require('log-symbols');
require('dotenv').config();

function connect() {
    return new Promise((resolve, reject) => {
        if (process.env.DEBUG === true) {
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.helper.setDbVersion('4.4.3');
            mockgoose
                .prepareStorage()
                .then(function() {
                    mongoose.connect(mongoConfig.host, (err, res) => {
                        if (err) return reject(err);
                        resolve(console.log(`${success} ${mongoConfig.host}`));
                    });
                })
                .catch(reject);
        } else {
            mongoose.connect(mongoConfig.host, mongoConfig.setting, (err, res) => {
                if (err) return reject(err);
                resolve(console.log(`${success} ${mongoConfig.host}`));
            });
        }
    });
}

async function disconnect() {
    try {
        await mongoose.disconnect();
        return console.log(`${success} Disconnect`);
    } catch (err) {
        return console.log(`${error} Disconnect Failed`);
    }
}

module.exports = { connect, disconnect };