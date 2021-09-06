const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
// local files
const router = require("./router");

const PORT = process.env.PORT || 5000;

// databse setup
mongoose.connect("mongodb://localhost:27017/ultimate-quiz-app", (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

// server setup
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(router);

server.listen(PORT, () => console.log(`server started at ${PORT}`));
