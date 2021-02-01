const bcrypt = require('bcrypt');

async function hash(password, saltRounds) {
    try {
        const result = await bcrypt.hash(password, saltRounds);
        return result;
    } catch (error) {
        return error;
    }
}
async function compare(password, hash) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = { hash, compare };