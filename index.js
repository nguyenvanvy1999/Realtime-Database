const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const mongo = require('./config/setting/mongo/index');
const morgan = require('morgan');
const cors = require('cors');
const serverConfig = require('./config/constant/server');
const UserRouter = require('./routers/user')();
const DataRouter = require('./routers/data')();
const FileRouter = require('./routers/file')();
const DeviceRouter = require('./routers/device')();
const flash = require('connect-flash');
const passport = require('passport');
// ________________________________________________
mongo.connectMongo();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(flash());
require('./middleware/passport')(passport);
app.use(passport.initialize());
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
app.use('/user', UserRouter);
app.use('/data', DataRouter);
app.use('/file', FileRouter);
app.use('/device', DeviceRouter);
// ________________________________________________
server.listen(serverConfig.port, serverConfig.host, () => {
    console.log(
        'server on: http://' + serverConfig.host + ':' + serverConfig.port
    );
});
// ________________________________________________
const socketFunction = require('./sockets/index').socketFunction;
const io = require('socket.io')(server);
io.on('connection', socketFunction);
// ________________________________________________