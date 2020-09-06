var express = require("express");
var router = express.Router();
const { newMessage } = require("../controllers/message");

// router.get("/", helloWorld);

router.post("/messages/new", newMessage);

module.exports = router;
