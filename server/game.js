const _get = require("lodash/get");
const _filter = require("lodash/filter");
const _head = require("lodash/head");
const _isEmpty = require("lodash/isEmpty");
const _find = require("lodash/find");
const _size = require("lodash/size");
const _noop = require("lodash/noop");

var ObjectId = require("mongodb").ObjectId;

const Admin = require("./models/admin");

const gameStore = {};

const addGame = async ({ gameKey, gameId, adminId }) => {
  if (gameStore[gameKey]) return { error: "Game already exists" };
  const ng = new Game({ gameKey, gameId, adminId });
  gameStore[gameKey] = ng;

  const admin = await Admin.findOne({ _id: adminId });
  const game = _head(
    _filter(_get(admin, "games", []), (game) => game.gameId === gameId)
  );

  ng.init(game);
  return ng;
};

const validateViewGame = (gameKey, cb) => {
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    cb({ error: "No game created" });
    return null;
  }
  return game;
}

const getGame = (gameKey) => gameStore[gameKey];

const getScore = (gamekey) => {};

const addScore = (gameKey, team, score) => {};

const getRounds = (gameKey, callback = _noop) => {
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    callback({ error: "No game created" });
    return null;
  }
  const rounds = game.getRounds();
  console.log("Rounds", rounds);

  callback({ rounds });
  return { rounds };
};

const startRound = (gameKey, roundId, callback) => {
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    callback({ error: "No game created" });
    return null;
  }
  game.startRound(roundId);
};

const showQuestion = (gameKey, callback = _noop) => {
  console.log('!!!!---- showing Game ----!!!!');
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    callback({ error: "No game created" });
    return null;
  }
  const question = game.getQuestion();
  callback({ question });
}

const nextQuestion = (gameKey, callback) => {
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    callback({ error: "No game created" });
    return null;
  }
  return game.askNextQuestion(callback);
};

const validateParticipent = (gameKey, password, cb = _noop) => {
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    cb({ error: "No game created" });
    return null;
  }
  return game.validateParticipent(password, cb);
};

const finishRound = () => {};

const submitAnswer = ({ gameKey, answer, questionId, participentId }) => {
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    return { error: "No game created" };
  }

  game.submitAnswer(answer, questionId, participentId);
};

const getQuestionTimer = (gameKey) => {
  const game = getGame(gameKey);
  if (_isEmpty(game)) {
    return { error: "No game created" };
  }
  return game.getRoundTimeLimit()
}

const ANSWER_TYPES = ["NORMAL", "PASS", "CHALLENGE"];
class Game {
  constructor({ gameKey, gameId, adminId }) {
    this.gameKey = gameKey;
    this.gameId = gameId;
    this.adminId = adminId;

    this.gameData = null;
    this.currentRound = null;
    this.currentQuestion = null;
    this.currentParticipent = null;
    this.askedQuestion = [];
    this.answerType = "NORMAL";
    this.challenger = null;

    this.participents = null;
    this.playing = [];
    this.score = {};
  }

  init(game) {
    this.gameData = game;
  }

  getRounds() {
    return _get(this.gameData, "gameRounds", []);
  }

  getRound(id) {
    return _find(this.getRounds(), (r) => {
      return r._id.toString() === id;
    });
  }

  startRound(id) {
    const r = this.getRound(id);
    this.currentRound = r;
    this.currentQuestion = null;
    this.currentParticipent = null;
    this.askedQuestion = [];
  }

  askNextQuestion(callback) {
    const r = this.currentRound;

    this.answerType = "NORMAL";
    this.challenger = null;

    const participents = _get(this.gameData, "gameParticipents", []);
    const qstns = _get(r, "questions", []);
    const { questionOccurance, questionAsked, onTimeOut } = r;

    if (
      questionOccurance === "clockwise" &&
      participents[_size(this.askedQuestion)]
    ) {
      const q = qstns[_size(this.askedQuestion)];
      if (_isEmpty(q)) {
        callback({ error: "Out of questions" });
        return null;
      }
      this.currentParticipent = q;

      const ob = {
        qestion: q,
        participent: participents[_size(this.askedQuestion)],
      };
      callback(ob);
      return ob;
    }
  }

  getQuestion () {
    const r = this.currentRound;
    this.questions = _get(r, 'question', []);
    console.log('on round', r._id);
    let qstn = this.questions[this.askedQuestion];
    console.log('on qstn', qstn._id);
    if(!_isEmpty(qstn)) {
      this.askedQuestion.push(qstn);
      return qstn;
    }
    return null;
  }

  validateParticipent(password, cb = _noop) {
    const participents = _get(this.gameData, "gameParticipents", []);
    const selectedParticipent = _find(
      participents,
      (p) => p.password === password
    );
    cb(
      selectedParticipent
        ? { participent: selectedParticipent }
        : { error: true }
    );
    return selectedParticipent;
  }

  getRoundTimeLimit() {
    return _get(this.currentRound, 'timeLimit', 0);
  }

  submitAnswer(answer, questionId, participentId) {
    const q = this.currentQuestion;
    const p = this.currentParticipent;
    const r = this.currentRound;

    if (q._id === questionId && p._id === participentId) {
      const ans = _get(q, 'answer');
      const bonus = _get(r, 'bonus');
      const negetive = _get(r, 'negetive');
      const score = _get(r, 'score');

      if (this.answerType === 'NORMAL') {
        if (answer === ans) {
          this.score[p._id] = _get(this.score, p._id, 0) + score;
        } else {
          this.score[p._id] = _get(this.score, p._id, 0) - negetive;
        }
      } else if (this.answerType === 'PASS') {
        if (answer === ans) {
          this.score[p._id] = _get(this.score, p._id, 0) + bonus;
        }
      } else if (this.answerType === 'CHALLENGE') {
        if (answer === ans) {
          this.score[p._id] = _get(this.score, p._id, 0) + score * 2;
        } else {
          this.score[p._id] = _get(this.score, p._id, 0) - score * 2;
        }
      }
    }
  }
}

module.exports = {
  addGame,
  getGame,
  getScore,
  getRounds,
  startRound,
  nextQuestion,
  validateParticipent,
  submitAnswer,
  getQuestionTimer,
};
