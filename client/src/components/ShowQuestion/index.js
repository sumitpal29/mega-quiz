import React, { useState, useEffect } from "react";
import { Button } from "antd";
import _get from "lodash/get";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import useCountDown from 'react-countdown-hook';
import SOCKET from "../../contexts/SocketContext";
import styles from "./showQuestion.module.scss";

function ShowQuestion({ gameKey, question, participent, player = null }) {
  let socket = SOCKET.getSocket();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  // set read only to false if participent id matches

  const answer = _get(question, "answer");
  const audioLink = _get(question, "audioLink");
  const videoLink = _get(question, "videoLink");
  const imageLink = _get(question, "imageLink");
  const options = _get(question, "options");

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(30000, 100);

  useEffect(() => {
    setShowAnswer(false);
    setShowTimer(false);
  }, [question]);

  useEffect(() => {
    socket.on("showanswer", () => {
      setShowAnswer(true);
    });
    socket.on("start-timer", ({time}) => {
      // start timer with time
      // play heartbeat music
      start(time);
    });
  }, []);

  const handleOptionClick = (val) => {
    if (!_isEmpty(player)) {
      if (player._id === participent._id) {
        // emit answer to server
        socket.emit("answer-submit", {
          gameKey,
          answer: val,
          questionId: question._id,
          participentId: participent._id,
        });
      }
    }
  };

  return (
    <div className={styles.background}>
      {showTimer && <div className={styles.timer}>{timeLeft}</div>}
      <div className={styles.questionBox}>{_get(question, "question")}</div>
      {audioLink && <h3>Load mp3 player</h3>}
      {videoLink && <h3>Video Player</h3>}
      {imageLink && <h3>Images</h3>}
      {options && (
        <div className={styles.optionBox}>
          {_map(options, (o) => (
            <Button
              onClick={handleOptionClick(o.value)}
              className={`${styles.smallOptionBox} ${showAnswer && o.value === answer && styles.rightAnswer}`}
            >
              {o.label}
            </Button>
          ))}
        </div>
      )}
      {showAnswer && <div className={styles.answerBox}>{answer}</div>}
    </div>
  );
}

export default ShowQuestion;
