import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useParams } from "react-router-dom";

import GamePlayAdmin from '../../components/GamePlayAdmin';

import SOCKET from '../../contexts/SocketContext';

function AdminGamePlayController() {
  let { gamekey } = useParams();

  const [gameRounds, setrounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);

  useEffect(() => {
    const socket = SOCKET.getSocket();
    socket.emit('getRounds', gamekey, ({ rounds, error }) => {
      if(error) {
        console.log(error);
        return null;
      }
      setrounds(rounds);
    });
  }, []);

  return (
    <div>
      <h2>Rounds</h2>
      {_map(gameRounds, (r, i) => {
        return <Button onClick={() => setSelectedRound(r)}>{_get(r, 'roundname', `round ${i}`)}</Button>
      })}
      {!_isEmpty(selectedRound) && <div><GamePlayAdmin gameKey={gamekey} round={selectedRound}/></div>}
    </div>
  )
}

export default AdminGamePlayController
