const Room = require("../models/room");
const mongoose = require("mongoose");
const Pusher = require("pusher");

// PUSHER config
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: process.env.PUSHER_ENCRYPTED,
});

const db = mongoose.connection;
db.once("open", () => {
  // console.log("PUSHER");
  // mongodb chage stream
  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch();

  changeStream.on("change", (change) => {
    // console.log(change);

    // actual pusher working
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("rooms", "inserted", {
        _id: roomDetails._id,
        name: roomDetails.name,
      });
    } else {
      console.log("PUSHER ERROR");
    }
  });
});

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
