var express = require("express");
var router = express.Router();
const { newMessage, syncMessages } = require("../controllers/message");

// router.get("/", helloWorld);

router.post("/messages/new", newMessage);
router.get("/messages/sync", syncMessages);

module.exports = router;
