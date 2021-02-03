const bcrypt = require('bcrypt');
const { APIError } = require('./error');
async function hash(password, saltRounds) {
    try {
        return await bcrypt.hash(password, saltRounds);
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