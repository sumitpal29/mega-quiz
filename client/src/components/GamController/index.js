import React from 'react';
import { Button } from 'antd';
import SOCKET from "../../contexts/SocketContext";
import styles from './gameController.module.scss';

function GameController({ gameKey, question, participent, round }) {
  const socket = SOCKET.getSocket();

  const showAnswer = () => {
    socket.emit('showanswer', (gameKey, true));
  };
  const startTimer = () => {
    socket.emit('starttimer', (gameKey, true));
  };

  return (
    <div className={styles.container}>
      <Button onClick={showAnswer} type="primary">Show Answer</Button>
      <Button onClick={startTimer} type="primary">Start Timer</Button>
      <Button>Right Answer by Participent</Button>
      <Button type="danger">Wrong Answer by Participent</Button>
      <Button type="success">Passed by Participent</Button>

      <h3>Passed and answered by</h3>
      <h3>challenged and answered by</h3>

      <Button>Next Question</Button>
      <Button>Show score</Button>
      <Button>Hide score</Button>
    </div>
  )
}

export default GameController
