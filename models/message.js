const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: String,
  message: String,
  name: String,
  timeStamp: String,
});

module.exports = mongoose.model("Message", messageSchema);
