import io from 'socket.io-client';

let socket;

const disconnect = () => {
  socket.emit('disconnect');
  socket.off();
}

const setSocket = (instance) => socket = instance

const getSocket = () => {
  if (socket) return socket;
  socket = io('http://localhost:5000', { transports : ['websocket'] });
  return socket;
};

const properties = {
  disconnect,
  setSocket,
  getSocket,
};

export default properties;
