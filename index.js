const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const mongo = require('./config/setting/mongo/index');
const morgan = require('morgan');
const cors = require('cors');
const serverConfig = require('./config/constant/server');
// ________________________________________________
mongo.connectMongo();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());
// ________________________________________________
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if (req.method === 'OPTIONS') {
        req.headers('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
// ________________________________________________
app.use('/user', require('./routers/user')());
app.use('/data', require('./routers/data')());
// ________________________________________________
server.listen(serverConfig.port, serverConfig.host, () => {
    console.log(
        'server on: http://' + serverConfig.host + ':' + serverConfig.port
    );
});
// ________________________________________________
const socketFunction = require('./sockets/function').socketFunction;
const io = require('socket.io')(server);
io.on('connection', socketFunction);
// ________________________________________________