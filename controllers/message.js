// exports.helloWorld = (req, res) => {
//   res.send("Hello");
// };
const Message = require("../models/message");
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
  const messageCollection = db.collection("messages");
  const changeStream = messageCollection.watch();

  changeStream.on("change", (change) => {
    // console.log(change);

    // actual pusher working
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timeStamp: messageDetails.timeStamp,
      });
    } else {
      console.log("PUSHER ERROR");
    }
  });
});

exports.newMessage = (req, res) => {
  const message = req.body;

  Message.create(message, (error, message) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(message);
    }
  });
};

exports.syncMessages = (req, res) => {
  Message.find((error, messages) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(messages);
    }
  });
};
