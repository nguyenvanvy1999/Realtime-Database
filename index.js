const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const mongo = require('./config/mongo/index');
const config = require('./config/constants');
const morgan = require('morgan');
const cors = require('cors');
// ________________________________________________
mongo.connectMongo();
//app.use(morgan("dev")); //log all request to console
app.use(bodyParser.urlencoded({ extended: false }));
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
server.listen(config.sever.port, config.sever.host, () => {
  console.log(
    'server on: http://' + config.sever.host + ':' + config.sever.port
  );
});
// ________________________________________________
const socketFunction = require('./sockets/function').socketFunction;
const io = require('socket.io')(server);
io.on('connection', socketFunction);
// ________________________________________________
