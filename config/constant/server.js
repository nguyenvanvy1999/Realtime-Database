require('dotenv').config();
const serverConfig = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
};
module.exports = serverConfig;