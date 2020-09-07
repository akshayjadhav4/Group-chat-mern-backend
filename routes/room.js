var express = require("express");
var router = express.Router();
const { createRoom, getRooms } = require("../controllers/room");

router.post("/room/new");
router.get("/room/all", getRooms);

module.exports = router;
