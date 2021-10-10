import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import _get from 'lodash/get';

import SOCKET from '../../contexts/SocketContext';
let socket;

function WatchGame({ location, history }) {
  // depends on the question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    socket = SOCKET.getSocket();
    const { gameKey } = queryString.parse(location.search);
    // set participent data on join
    socket.emit('viewgame', { gameKey }, ({ error, participent }) => {
      if(error) {
        history.push('/view');
        return;
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [location.search]);
  
  useEffect(() => {
    console.log('init socket');
    socket.on('question', ({ qestion }) => {
      console.log('clintSide', qestion)
      setCurrentQuestion(qestion);
    });
  }, []);

  return (
    <div>
      Game
      {currentQuestion && <showQuestion question={currentQuestion}/>}
    </div>
  )
}

export default WatchGame;
