var express = require("express");
var router = express.Router();
const { helloWorld } = require("../controllers/message");

router.get("/", helloWorld);

module.exports = router;
