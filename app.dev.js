import path from 'path';
import express from 'express';
import webpack from 'webpack';
import SocketIo from 'socket.io';
import mongoose from 'mongoose';
import socketEvents from './socketEvents';
let enVars = require('./enVars');
let app = express();

mongoose.connect(enVars.MLAB_URI);

let config = require('./webpack.config.dev');
let compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));


//Get the routers in here!
const tripRouter = express.Router();
require('./routes/trip_routes')(tripRouter);
app.use('/api', tripRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});



let port = process.env.port || 8080;
let server = app.listen(port);

const io = new SocketIo(server, { path: '/api/chat' });

socketEvents(io);
