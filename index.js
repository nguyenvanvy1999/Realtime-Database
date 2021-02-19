/**
 * Required modules
 */
const express = require('express'),
    { connect } = require('./config/setting/mongo/index'),
    morgan = require('morgan'),
    cors = require('cors'),
    flash = require('connect-flash'),
    handlebars = require('express-handlebars'),
    path = require('path'),
    { success, error, info, warning } = require('log-symbols');
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
app.use(flash());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        req.headers('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
/**
 * Set view engine
 */
app.engine(`hbs`, handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
/**
 * Express router
 */
app.use('/user', UserRouter);
app.use('/data', DataRouter);
app.use('/file', FileRouter);
app.use('/device', DeviceRouter);
app.get('/', (req, res) => res.render('home'));
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