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
    { handleError } = require('./middleware/error'),
    passport = require('passport'),
    cluster = require('cluster'),
    os = require('os');
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
app.use(
    session({
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
        cookie: { secure: false }, //no https
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
    })
);
//app.set('trust proxy', 1) // trust first proxy if https
app.use(flash());
//CORS config
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
 * Config passport
 */
require('./middleware/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
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

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);
//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     });
// } else {
//     // Workers can share any TCP connection
//     // In this case it is an HTTP server
//     app.listen(serverConfig.port);
//     console.log(`Worker ${process.pid} started`);
// }
async function startServer() {
    try {
        connect();
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