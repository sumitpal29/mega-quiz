let socket;

const disconnect = () => {
  socket.emit('disconnect');
  socket.off();
}

const setSocket = (instance) => socket = instance

const getSocket = () => socket;

const properties = {
  disconnect,
  setSocket,
  getSocket,
};

export default properties;
