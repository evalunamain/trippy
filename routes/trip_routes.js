let Trip = require('../models/Trip');
let bodyparser = require('body-parser');

function docToClient(doc) {
  doc = doc.toObject();
  doc.id = doc._id;
  delete doc._id;
  delete doc.__v;
  return doc;
}

module.exports = function (router) {
  router.use(bodyparser.json());

  router.post('/trips/:tripId/messages', function (req, res) {
    Trip.findById(req.params.tripId, function (err, trip) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal service error.' });
      }

      let message = req.body;
      trip.messages.push(message);
      trip.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Message failed to be added to trip.'});
        }
        return res.sendStatus(200);
      });

    });
  });

  router.post('/trips/:tripId/waypoints', function (req, res) {
    Trip.findById(req.params.tripId, function (err, trip) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal service error.' });
      }

      let waypoint = req.body;
      let id = waypoint.id;

      trip.waypointsById.push(id);
      trip.waypoints = trip.waypoints || {};
      trip.waypoints[id] = waypoint;
      trip.markModified('waypoints');
      trip.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Waypoint failed to be added to trip.'});
        }
        return res.sendStatus(200);
      });

    });
  });

  router.delete('/trips/:tripId/waypoints', function (req, res) {
    Trip.findById(req.params.tripId, function (err, trip) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal service error.' });
      }

      let id = req.body.waypointId;

      trip.waypoints[id].deleted =true;
      trip.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Waypoint failed to be added to trip.'});
        }
        return res.sendStatus(200);
      });

    });
  });

  router.post('/trips/:tripId/messages', function (req, res) {
    Trip.findById(req.params.tripId, function (err, trip) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal service error.' });
      }

      let message = req.body;
      trip.messages.push(message);
      trip.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Message failed to be added to trip.'});
        }
        return res.sendStatus(200);
      });

    });
  });



  router.get('/trips/:tripId', function (req, res) {
    Trip.findById(req.params.tripId, function (err, trip) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal service error.' });
      }

      if (!trip) {
        res.status(404).json({ msg: `Couldn't find trip ${req.params.tripId}` });
      } else {
        trip = docToClient(trip);
        res.json(trip);
      }
    });
  });

  router.post('/newtrip',  function (req, res) {
    let newTrip = new Trip({ title: req.body.title });
    newTrip.save(function (err, trip) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal service error.' });
      }

      trip = docToClient(trip);
      res.json(trip);
    });
  });
};
