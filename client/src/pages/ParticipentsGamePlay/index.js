import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import _map from 'lodash/map';

let socket;

function ParticipentsGamePlay({ location }) {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    const { room, password } = queryString.parse(location.search);
    console.log('You are in', room, password);

    socket = io('http://localhost:5000', { transports : ['websocket'] });

    socket.emit('join', { room, password });

    console.log(socket);

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [location.search]);


  useEffect(() => {
    socket.on('message', (m) => {
      console.log('message received', m)
      setMessages(p => [...p, m]);
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => {
        setMessage('')
      })
    }
  }
  return (
    <div>
      <h1>All messages</h1>
      {_map(messages, m => <p>{m.text}</p>)}

      <h2>Type here</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
      />
    </div>
  )
}

export default ParticipentsGamePlay
