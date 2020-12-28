const bcrypt = require('bcrypt');

function hash(password, saltRounds) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

function compare(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(error, result) {
            //get hash in DB
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}
module.exports = {
    hash: hash,
    compare: compare,
};