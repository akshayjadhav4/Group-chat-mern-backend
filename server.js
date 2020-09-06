// imports
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// app instance
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// app port
const PORT = process.env.PORT || 2004;

// endpoint for testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

// listen
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
