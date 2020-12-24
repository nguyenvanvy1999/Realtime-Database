const mongoose = require('mongoose');
const config = require('../constants');

// ________________________________________________

function connectMongo() {
  mongoose.Promise = global.Promise;
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    config.mongo.host,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) {
        return;
      } else {
        console.log('connect successfully to db: ', config.mongo.host);
      }
    }
  );
}

module.exports = {
  connectMongo: connectMongo,
};
