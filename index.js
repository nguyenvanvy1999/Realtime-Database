const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    { connect } = require('./config/setting/mongo/index'),
    morgan = require('morgan'),
    cors = require('cors'),
    flash = require('connect-flash'),
    { success, error, info, warning } = require('log-symbols'),
    serverConfig = require('./config/constant/server'),
    UserRouter = require('./routers/user')(),
    DataRouter = require('./routers/data')(),
    FileRouter = require('./routers/file')(),
    DeviceRouter = require('./routers/device')();
// ________________________________________________
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(flash());
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
app.get('/', (req, res) => res.status(200).send('Welcome!'));
// ________________________________________________

async function startServer() {
    try {
        await connect();
        await server.listen(process.env.PORT);
        console.log(`${success} http://${serverConfig.host}:${serverConfig.port}`);
    } catch (err) {
        console.log(`${error} http://${serverConfig.host}:${serverConfig.port}`);
    }
}

startServer();
// ________________________________________________
const socketFunction = require('./sockets/index').socketFunction;
const io = require('socket.io')(server);
io.on('connection', socketFunction);
// ________________________________________________