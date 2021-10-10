import React, { useMemo, useState, useEffect } from "react";
import { Button } from "antd";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import ShowQuestion from "../ShowQuestion";
import GameController from "../GamController";

import SOCKET from "../../contexts/SocketContext";

function GamePlayAdmin({ round, gameKey }) {
  const socket = SOCKET.getSocket();
  const questions = useMemo(() => _get(round, "questions", []), [round]);
  const [isRoundStart, setIsRoundStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentParticipent, setCurrentParticipent] = useState(null);

  const handleRoundStart = () => {
    setIsRoundStarted(true);
    socket.emit("startRound", { gameKey, roundId: round._id });
  };

  useEffect(() => {
    socket.on("question", ({ qestion, participent }) => {
      console.log("clintSide", qestion, participent);
      setCurrentQuestion(qestion);
      setCurrentParticipent(participent);
    });
  }, [gameKey, questions, socket]);

  return (
    <div>
      <h2>{round.roundname}</h2>
      <Button disabled={isRoundStart} onClick={handleRoundStart} type="primary">
        Start Round
      </Button>
      {!_isEmpty(currentQuestion) && (
        <>
          <GameController gameKey={gameKey}
            question={currentQuestion}
            participent={currentParticipent}
            round={round}
          />
          <ShowQuestion
            gameKey={gameKey}
            question={currentQuestion}
            participent={currentParticipent}
            round={round}
          />
        </>
      )}
    </div>
  );
}

export default GamePlayAdmin;
