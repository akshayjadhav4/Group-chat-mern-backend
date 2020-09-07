const Room = require("../models/room");

exports.createRoom = (req, res) => {
  const room = req.body;

  Room.create(room, (error, room) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(room);
    }
  });
};
exports.getRooms = (req, res) => {
  Room.find((error, rooms) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(rooms);
    }
  });
};
