// exports.helloWorld = (req, res) => {
//   res.send("Hello");
// };
const Message = require("../models/message");

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
