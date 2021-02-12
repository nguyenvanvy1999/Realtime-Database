const mongoose = require('mongoose');
const mongoConfig = require('../../constant/mongo');

// ________________________________________________

function connectMongo() {
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.connect(mongoConfig.host, mongoConfig.setting, (err, db) => {
        if (err) {
            console.log(" Can't connect successfully to db: ", mongoConfig.host);
            return;
        }
        console.log('connect successfully to db: ', mongoConfig.host);
    });
}

module.exports = {
    connectMongo: connectMongo,
};