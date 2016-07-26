import path from 'path';
import express from 'express';
import webpack from 'webpack';
import SocketIo from 'socket.io';
import mongoose from 'mongoose';
import enVars from './enVars';
import socketEvents from './socketEvents';

let app = express();

mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/trippy');

//Get the routers in here!
const tripRouter = express.Router();
require('./routes/trip_routes')(tripRouter);
app.use('/api', tripRouter);

app.get('/static/bundle.js', function(req,res) {
	res.sendFile(path.join(__dirname, '/dist/bundle.js'));
});

app.get('/static/bundle.js.map', function(req,res) {
	res.sendFile(path.join(__dirname, '/dist/bundle.js.map'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});



let port = process.env.port || 8080;
let server = app.listen(port);

const io = new SocketIo(server, { path: '/api/chat' });

socketEvents(io);
