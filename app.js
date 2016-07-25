let path = require('path');
let express = require('express');
let webpack = require('webpack');
let SocketIo = require('socket.io');
let mongoose = require('mongoose');
// let enVars = require('./enVars');

let app = express();

mongoose.connect(process.env.MLAB_URI || require('./enVars').MLAB_URI);

if (process.env.NODE_ENV !== 'production') {
	let config = require('./webpack.config.dev');
	let compiler = webpack(config);
	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath,
	}));
	app.use(require('webpack-hot-middleware')(compiler));
}

//Get the routers in here!
const tripRouter = express.Router();
require('./routes/trip_routes')(tripRouter);
app.use('/api', tripRouter);

if (process.env.NODE_ENV === 'production') {
	app.get('/static/bundle.js', function(req,res) {
		res.sendFile(path.join(__dirname, '/dist/bundle.js'));
	});
	app.get('/static/bundle.js.map', function(req,res) {
		res.sendFile(path.join(__dirname, '/dist/bundle.js.map'));
	});
}

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});



let port = process.env.port || 8080;
let server = app.listen(port);

const io = new SocketIo(server, { path: '/api/chat' });

const socketEvents = require('./socketEvents')(io);
