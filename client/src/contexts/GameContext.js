import React, { useState, createContext, useContext, useEfect } from "react";
import _get from 'lodash/get';
import _map from 'lodash/map';
import _set from 'lodash/set';
import _head from 'lodash/head';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import { getNewGameStrcuture } from '../utils';

const GameContext = createContext(null);

function GameProvider(props) {
  const [availableGame, setAvailableGames] = useState([]);
  const [game, setGame] = useState(null);
  const [gamePlay, setGamePlay] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const setCurrentGame = (id) => {
    setSelectedGameId(id)
  }

  const getGame = (id) => _head(_filter(availableGame, g => _get(g, 'gameId') === id));
  const getAllGames = () => availableGame;

  const resetGame = () => {
    setGame(getNewGameStrcuture())
  };

  const addNewGame = (game) => setAvailableGames(g => ([...g, game]));
  const onAdminOnBoard = (_games) => {
    console.log('received games', _games);
    if (!_isEmpty(_games)) setAvailableGames(_games);
  }
  
  const createNewGame = () => {
    const _game = getNewGameStrcuture();
    console.log('New game created!!')
    // setGame(_game);
    return _game;
  };

  const updateGame = (gameData) => {
    console.log('game updated!!', gameData)
    if (!_isEmpty(gameData)) {
      setGame(prev => ({ ...prev, ...gameData}));
    }
  }

  const addRound = (roundDta) => {
    setAvailableGames(_map(availableGame, g => {
      if(g.gameId === selectedGameId) {
        return {...g, gameRounds: [...g.gameRounds, roundDta]}
      }
      return g;
    }));
  };

  const getRounds = () => _get(getGame(selectedGameId), 'gameRounds', []);
  const getRound = id => getRounds()[id]

  const addQuestions = (roundIndex, question) => {
    const selectedRound =  getRound(roundIndex);
    const questions = _get(selectedRound, 'questions', []);
    questions.push(question);
    const updatedRound = _set(selectedRound, 'questions', questions);
    updateRound(roundIndex, updatedRound)
  }
  const deleteRound = () => {};
  const updateRound = (roundId, updatedRound) => {
    const newGames = _map(availableGame, game => {
      if (game.gameId === selectedGameId) game.gameRounds[roundId] = updatedRound;
      return game;
    })
    console.log('updating Games for roundChange', newGames);
    setAvailableGames(newGames);
  };

  const getQuestions = (roundIndex) => _get(getRounds()[roundIndex], 'questions', []);
  const deleteQuestion = ({ roundIndex, questionIndex }) => {
    const round = getRound(roundIndex);
    const allQ = getQuestions(roundIndex);
    const updatedQ = _filter(allQ, (_, i) => i !== questionIndex);
    const updatedR = {...round, questions: updatedQ}
    updateRound(roundIndex, updatedR)
  };
  const updateQuestion = ({ roundIndex, questionIndex, question }) => {
    const round = getRound(roundIndex);
    const updatedQ = [...getQuestions(roundIndex)];
    updatedQ[questionIndex] = question;
    const updatedR = {...round, questions: updatedQ}
    updateRound(roundIndex, updatedR);
  }

  const addParticipent = (participent) => {
    setAvailableGames(_map(availableGame, g => {
      if(g.gameId === selectedGameId) {
        return {...g, gameParticipents: [...g.gameParticipents, participent]}
      }
      return g;
    }));
  };
  const deleteParticipent = () => {};
  const updateParticipents = () => {};
  const getParticipents = () => _get(getGame(selectedGameId), 'gameParticipents', []);

  const loadGame = () => {};
  const saveGame = () => {};
  const deleteGame = () => {};

  const newGamePlay = () => {}; // new game instance
  const updateGamePlay = () => {};
  const resetGamePlay = () => {};

  return (
    <GameContext.Provider
      value={{
        game,
        gamePlay,
        resetGame,
        createNewGame,
        addRound,
        deleteRound,
        updateRound,
        getRounds,
        addParticipent,
        deleteParticipent,
        updateParticipents,
        getParticipents,
        loadGame,
        saveGame,
        newGamePlay,
        updateGamePlay,
        updateGame,
        resetGamePlay,
        deleteGame,
        getGame,
        getAllGames,
        addNewGame,
        addQuestions,
        setCurrentGame,
        getQuestions,
        deleteQuestion,
        updateQuestion,
        onAdminOnBoard,
      }}
      {...props}
    />
  );
}

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
