require('dotenv').config();
const path = require('path');
const fileConfig = {
    path: path.join(__dirname, '../../uploads'),
};

module.exports = fileConfig;