import React, { useState, useEffect } from "react";
import { Modal, Divider, Row, Col, Button } from "antd";
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'

import { useGameContext } from "../../../contexts/GameContext";
import CreateGameForm from "../../forms/CreateGameForm";
import AddRoundModal from "../AddRounds";

import styles from "./createGame.module.scss";

function GameModal({ isModalVisible, hideModal, onSubmit }) {
  const { createNewGame } = useGameContext();
  const [gameName, setGameName] = useState("");

  const handleOk = () => {
    onSubmit({ ...createNewGame(), gameName });
    hideModal();
  };

  const handleCancel = () => {
    hideModal();
  };

  const onFieldChange = (val) => {
    setGameName(val);
  };

  return (
    <div>
      <Modal
        title="Create new Game"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <Row>
          <Col span={24}>
            <CreateGameForm onFieldChange={onFieldChange} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default GameModal;
