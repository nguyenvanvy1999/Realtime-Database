const bcrypt = require('bcrypt'),
    { APIError } = require('./error'),
    bcryptConfig = require('../config/constant/bcrypt');
async function hash(password) {
    try {
        return await bcrypt.hash(password, bcryptConfig.saltRound);
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function compare(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = { hash, compare };