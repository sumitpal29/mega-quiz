const _noop = require("lodash/noop");

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
// local files
const router = require("./router");

// const {
//   addParticipent,
//   removeParticipent,
//   getParticipent,
//   getParticipentsInRoom
// } = require('./participents');

const {
  addGame,
  getRounds,
  startRound,
  nextQuestion,
  validateParticipent,
  submitAnswer,
  getQuestionTimer,
  validateViewGame,
  showQuestion,
} = require("./game");
const { default: ShowQuestion } = require("../client/src/components/ShowQuestion");

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

io.on("connection", (socket) => {
  console.log("We have a new connection%c", "color:red;");

  // socket.on('join', ({ password, room }, callback = _noop) => {
  //   console.log({ password, room});
  //   const { error, participent } = addParticipent({ id: socket.id, password, game: room });

  //   if(error) return callback(error);

  //   socket.emit('message',  { participent:'admin', text: `Welcome to the game ${room}` });
  //   socket.broadcast.to(participent.game).emit('message', { participent: 'admin', text: `New participent join: ${participent.id}`})
  // socket.join(participent.game)

  //   callback();
  // });

  socket.on("disconnect", () => {
    console.log("User has left!!!");
  });

  socket.on(
    "createGame",
    async ({ gameKey, gameId, adminId }, callback = _noop) => {
      const newGame = await addGame({ gameKey, gameId, adminId });
      socket.join(gameKey);
      callback(newGame);
    }
  );

  socket.on("getRounds", (gameKey, callback) => {
    getRounds(gameKey, callback);
  });

  socket.on("startRound", ({ gameKey, roundId }) => {
    startRound(gameKey, roundId);
    // nextQuestion(gameKey, ({ qestion, participent, error }) => {
    //   io.to(gameKey).emit("question", { qestion, participent });
    // });
    showQuestion(gameKey, ({question, error}) => {
      io.to(gameKey).emit("question", { qestion });
    })
  });

  socket.on('showanswer', (gameKey) => {
    console.log(gameKey, 'emitted show answer');
    io.to(gameKey).emit("showanswer", true);
  });

  socket.on('starttimer', (gameKey, value) => {
    const time = getQuestionTimer(gameKey);
    console.log(gameKey, 'emitted', time);
    io.to(gameKey).emit('starttimer', { time });
  });

  socket.on("joingame", ({ gameKey, password }, cb = _noop) => {
    validateParticipent(gameKey, password, ({ error, participent }) => {
      if (error) {
        console.log("User not authorised!!!");
        cb({ error: "User not authorised!!!" });
      }
      socket.join(gameKey);
      cb({ participent });
    });
  });

  socket.on(
    "answer-submit",
    ({ gameKey, answer, questionId, participentId }, cb = _noop) => {
      const { error } = submitAnswer({
        gameKey,
        answer,
        questionId,
        participentId,
      });
      if (error) {
        console.log("Something went wrong at answer submit");
        cb({ error: "Something went wrong at answer submit" });
      }
    }
  );

  socket.on("viewgame", ({ gameKey }, cb = _noop) => {
    validateViewGame(gameKey, ({ error }) => {
      if (error) {
        cb({ error: "User not authorised!!!" });
      }
      socket.join(gameKey);
    });
  });

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
