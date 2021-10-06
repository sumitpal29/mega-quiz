const gameStore = {}

const addGame = ({ gameKey, gameId, adminId }) => {
  if (gameStore[gameKey]) return { error: 'Game already exists' }
  const ng = new Game({ gameKey, gameId, adminId });
  gameStore[gameKey] = ng;
  console.log('store')
  console.log(gameStore)
  return ng;
}

const getGame = gamekey => gameStore[gameKey];

const getScore = (gamekey) => {

}

class Game {
  constructor({ gameKey, gameId, adminId }) {
    this.gameKey = gameKey;
    this.gameId = gameId;
    this.adminId = adminId;

    this.gameData = null;
    this.currentRound = null;
    this.currentQuestion = null;
    this.currentParticipent = null;

    this.participents = null;
    this.playing = [];

    this.score = null;
  }
}

module.exports = {
  addGame,
  getGame,
  getScore
}