/**
 * Required modules
 */
const express = require('express'),
	{ open } = require('./config/mongo'),
	morgan = require('morgan'),
	cors = require('cors'),
	flash = require('connect-flash'),
	{ success, error } = require('log-symbols'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	{ handleError, handleNotFoundPage } = require('./middleware/error'),
	passport = require('passport'),
	{ get } = require('./config');
/**
 * Config and Routers
 */
const UserRouter = require('./routers/user')(),
	DataRouter = require('./routers/data')(),
	FileRouter = require('./routers/file')(),
	DeviceRouter = require('./routers/device')();
/**
 * Express config
 */
const app = express();
const server = require('http').Server(app);
if (!get('DEBUG')) app.use(morgan('dev')); //don't log when test
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
app.use(handleNotFoundPage);
app.use(handleError);
/**
 * Start Server
 */

function startServer() {
	try {
		open();
		app.listen(get('PORT'));
		console.log(`${success} http://${get('URL')}:${get('PORT')}`);
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

/**
 *
 */

module.exports = app;
