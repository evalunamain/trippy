exports = module.exports = function (io) {
  io.on('connection', function (socket) {

    socket.on('trip mounted', function (tripId) {
      socket.join(tripId);
      socket.tripId = tripId;
      let authors = io.sockets.adapter.rooms[socket.tripId].authors;
      if (authors) {
        let authorIds = Object.keys(authors);
        if (authorIds.length) {
          socket.emit('current authors', authors);
        }
      }
    });

    socket.on('new waypoint', function (waypoint) {
      socket.broadcast.to(socket.tripId).emit('new waypoint', waypoint);
    });

    socket.on('author typing', function (authorId) {
      socket.broadcast.to(socket.tripId).emit('author typing', authorId);
    });

    socket.on('author stop typing', function (authorId) {
      socket.broadcast.to(socket.tripId).emit('author stop typing', authorId);
    });

    //TODO: Fix that ugly IF.
    socket.on('disconnect', function () {
      if (socket.author) socket.broadcast.to(socket.tripId).emit('author left', socket.author.id);

      if ( io.sockets.adapter.rooms[socket.tripId] &&
           io.sockets.adapter.rooms[socket.tripId].authors  &&
           io.sockets.adapter.rooms[socket.tripId].authors[socket.author.id]
          ) {
        delete io.sockets.adapter.rooms[socket.tripId].authors[socket.author.id];
      }
    });

    socket.on('new author', function (author) {
     socket.author = author;
     io.sockets.adapter.rooms[socket.tripId].authors = io.sockets.adapter.rooms[socket.tripId].authors || {};
     io.sockets.adapter.rooms[socket.tripId].authors[author.id] = { name: author.name };

      socket.broadcast.to(socket.tripId).emit('new author', author);
    });

    socket.on('new message', function (msg) {
      socket.broadcast.to(socket.tripId).emit('new message', msg);
    });
  });
};
