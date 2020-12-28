const mongoose = require('mongoose');
const mongoConfig = require('../../constant/mongo');

// ________________________________________________

function connectMongo() {
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.connect(
        mongoConfig.host, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        function(err, db) {
            if (err) {
                return;
            } else {
                console.log('connect successfully to db: ', mongoConfig.host);
            }
        }
    );
}

module.exports = {
    connectMongo: connectMongo,
};