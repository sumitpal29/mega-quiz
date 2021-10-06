const _trim = require('lodash/trim')
const _find = require('lodash/find')
const _reject = require('lodash/reject')
const _filter = require('lodash/filter')
const _toLower = require('lodash/toLower')

const participents = [];

const addParticipent = ({ id, password, game }) => {
  password = _toLower(_trim(password));
  game = _toLower(_trim(game));


  // exsiting user check
  const isExsistingUser = _find(participents, p => p.password === password)

  if(isExsistingUser) {
    return { error: 'User already in the game'}
  }

  const participent = { id, password, game };

  participents.push(participent);

  return { participent }
};
const removeParticipent = (id) => {
  participents = _reject(participents, p => p.id === id);
};
const getParticipent = (id) => {
  console.log('id',id)
  console.log(participents)
  const participent = _find(participents, p => p.id === id);
  if(!participent) return { error: 'Something went wrong' };

  return { participent }
};
const getParticipentsInRoom = (room) => {
  return _filter(participents, p => p.game === game)
};

module.exports = {
  addParticipent,
  removeParticipent,
  getParticipent,
  getParticipentsInRoom,
}