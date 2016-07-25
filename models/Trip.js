'use strict';

let mongoose = require('mongoose');
let shortid = require('shortid');

let tripSchema = mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  title: {type: String, required: true},
  messages: [mongoose.Schema.Types.Mixed],
  waypoints: mongoose.Schema.Types.Mixed,
  waypointsById: [String],
  timestamp: {type: String, default: Date.now(), required: true}
});

module.exports = mongoose.model('Trip', tripSchema);

