const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  name: String,
  timeStamp: String,
});

module.exports = mongoose.model("Message", messageSchema);
