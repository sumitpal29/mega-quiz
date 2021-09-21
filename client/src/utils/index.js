import {v4 as uuidv4 } from 'uuid';
import password from 'generate-password';

export const getNewGameStrcuture = () => ({
  gameId: uuidv4(),
  gameName: '',
  gameRounds: [],
  gameParticipents: []
});

export const generateNewPassword = () => password.generate({
  length: 6,
  numbers: true
});