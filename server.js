// imports
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const messageRoutes = require("./routes/message");

// app instance
const app = express();

// DB config
const databaseURL = process.env.DATABASE_URL;

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => console.log(error));

// middlewares
app.use(express.json());
app.use(cors());

// app port
const PORT = process.env.PORT || 2004;

// endpoint for testing
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
//using endpoints
app.use("/api", messageRoutes);

// listen
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
