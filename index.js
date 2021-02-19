/**
 * Required modules
 */
const express = require('express'),
    { connect } = require('./config/setting/mongo/index'),
    morgan = require('morgan'),
    cors = require('cors'),
    flash = require('connect-flash'),
    path = require('path'),
    { success, error, info, warning } = require('log-symbols'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    { handleError } = require('./middleware/error');
/**
 * Config and Routers
 */
const serverConfig = require('./config/constant/server'),
    UserRouter = require('./routers/user')(),
    DataRouter = require('./routers/data')(),
    FileRouter = require('./routers/file')(),
    DeviceRouter = require('./routers/device')();
/**
 * Express config
 */
const app = express();
const server = require('http').Server(app);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 60000 }, secret: 'secret', resave: true, saveUninitialized: false }));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.message = req.flash();
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        req.headers('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/uploads', express.static('uploads'));
/**
 * Express router
 */
app.use('/user', UserRouter);
app.use('/data', DataRouter);
app.use('/file', FileRouter);
app.use('/device', DeviceRouter);
app.get('/', (req, res) => res.json('hello world'));

app.use(handleError);
/**
 * Start Server
 */
async function startServer() {
    try {
        await connect();
        await app.listen(serverConfig.port);
        console.log(`${success} http://${serverConfig.host}:${serverConfig.port}`);
    } catch (err) {
        console.log(`${error} Connect server failed`);
        throw Error(err);
    }
}
startServer();
/**
 * SocketIO
 */
const socketFunction = require('./sockets/index').socketFunction;
const io = require('socket.io')(server);
io.on('connection', socketFunction);