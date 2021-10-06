const _noop = require('lodash/noop');

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
// local files
const router = require("./router");

const {addParticipent,
  removeParticipent,
  getParticipent,
  getParticipentsInRoom} = require('./participents');

const { addGame } = require('./game');

const PORT = process.env.PORT || 5000;

// databse setup
mongoose.connect("mongodb://localhost:27017/ultimate-quiz-app", (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

// server setup
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('We have a new connection%c', 'color:red;');

  // socket.on('join', ({ password, room }, callback = _noop) => {
  //   console.log({ password, room});
  //   const { error, participent } = addParticipent({ id: socket.id, password, game: room });

  //   if(error) return callback(error);

  //   socket.emit('message',  { participent:'admin', text: `Welcome to the game ${room}` });
  //   socket.broadcast.to(participent.game).emit('message', { participent: 'admin', text: `New participent join: ${participent.id}`})
  //   socket.join(participent.game)
    
  //   callback();
  // });

  socket.on('disconnect', () => {
    console.log('User has left!!!')
  })

  socket.on('createGame', ({ gameKey, gameId, adminId }, callback = _noop ) => {
    const newGame = addGame({gameKey, gameId, adminId})
    callback(newGame)
  })

  // socket.on('sendMessage', (message, callback = _noop) => {
  //   const { participent, error } = getParticipent(socket.id)
  //   if(!participent) {
  //     callback(error)
  //   }
  //   console.log('p==', participent)

  //   io.to(participent.game).emit('message', { participent: participent.id, text: message })
  //   callback()
  // })
});

app.use(cors());
app.use(express.json());
app.use(router);

server.listen(PORT, () => console.log(`server started at ${PORT}`));
