import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import _get from 'lodash/get';

import SOCKET from '../../contexts/SocketContext';
let socket;

function ParticipentsGamePlay({ location, history }) {
  const [participentData, setParticipentData] = useState(null);
  // depends on the question
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentParticipent, setCurrentParticipent] = useState(null);

  useEffect(() => {
    socket = SOCKET.getSocket();
    const { gameKey, password } = queryString.parse(location.search);
    // set participent data on join
    socket.emit('joingame', { gameKey, password }, ({ error, participent }) => {
      console.log({ error, participent })
      if(error) {
        history.push('/join');
        return;
      }
      setParticipentData(participent);
    });

    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [location.search]);


  useEffect(() => {
    socket.on('question', ({ qestion, participent }) => {
      console.log('clintSide', qestion, participent)
      setCurrentQuestion(qestion);
      setCurrentParticipent(participent)
    });
  }, []);

  return (
    <div>
      <h1>Question</h1>
      <showQuestion question={currentQuestion} participent={currentParticipent} player={participentData}/>
    </div>
  )
}

export default ParticipentsGamePlay
