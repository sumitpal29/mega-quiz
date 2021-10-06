import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useParams } from "react-router-dom";
import io from 'socket.io-client'

import _get from "lodash/get";
import _map from "lodash/map";
import _size from "lodash/size";
import _isEmpty from "lodash/isEmpty";

import { useAdminContext } from "../../contexts/AdminContext";
import { useGameContext } from "../../contexts/GameContext";
import SOCKET from '../../contexts/SocketContext';

import Layout from "../../components/Layout";
import Rounds from "../../components/Rounds";
// Modals
import AddRoundModal from "../../components/modals/AddRounds";
import AddParticipentsModal from "../../components/modals/AddParticipents";
import StartGame from '../../components/modals/StartGame';


import styles from "./adminGameEditPage.module.scss";

function AdminGameEditPage({ history }) {
  let { id } = useParams();
  // local state
  const [game, setGame] = useState(null);
  const [isAddRoundModalVisible, setisAddRoundModalVisible] = useState(false);
  const [participentModalVisibility, setparticipentModalVisibility] = useState(false);
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);
  const [adminLogoutBtnLoading, setAdminLogoutBtnLoading] = useState(false);
  const [startGameModalVisible, setstartGameModalVisible] = useState(false);

  const { isAdminLoggedIn, isAuthenticated, admin, saveGame, adminLogout, isAuthenticating } = useAdminContext();
  const { addRound, getGame, getRounds, setCurrentGame, addParticipent, getParticipents, getAllGames, onAdminOnBoard } = useGameContext();

  useEffect(() => {
    const socket = io('http://localhost:5000', { transports : ['websocket'] });
    SOCKET.setSocket(socket);
  }, []);

  useEffect(() => {
    console.log('here')
    if (!id) {
      history.push("/admin");
    }

    if (!isAdminLoggedIn && isAuthenticated) {
      console.log('going to admin')
      history.push("/admin");
    }
    
    if(!_isEmpty(admin) && isAuthenticated) {
      console.log('Indide dude')
      const currentAdminSavedGames = _get(admin, 'games', []);

      if (_isEmpty(currentAdminSavedGames)) history.push("/admin-dasboard");
      onAdminOnBoard(currentAdminSavedGames)
      
      const currentGame = getGame(id);
      
      if (!_isEmpty(currentGame)) {
        setCurrentGame(id);
        setGame(currentGame);
      } else history.push("/admin-dasboard");
    }
    
  }, [isAdminLoggedIn, history, isAuthenticating, isAuthenticated, admin]);

  const rounds = getRounds();
  const participents = getParticipents();

  const handleOnAddRound = () => setisAddRoundModalVisible(true);
  const handleOnAddRoundSubmit = (data) => {
    addRound(data);
    setisAddRoundModalVisible(false);
  };
  const handleOnAddRoundHide = () => setisAddRoundModalVisible(false);

  const handleHideParticipentModal = () => setparticipentModalVisibility(false);
  const showParticipentsModal = () => setparticipentModalVisibility(true);
  const handleParticipentModalSubmit = (data) => {
    console.log("handle Participent data submit", data);
    addParticipent(data);
  };

  const handleSaveGame = async () => {
    try{
      const games = getAllGames();
      setIsSaveButtonLoading(true)
      const res = await saveGame(games, () => message.info('Successfully updated game base'), (e) => message.error(e));
      setIsSaveButtonLoading(false)
      console.log(res);
    } catch (e) {
      console.log(e)
    }
  };

  const handleLogout = async () => {
    try{
      setAdminLogoutBtnLoading(true);
      await adminLogout();
      setAdminLogoutBtnLoading(false);
      history.push('/admin');
    } catch (e) {
      console.error(e)
    }
  }

  const handlePlayButtonClick = () => {
    setstartGameModalVisible(true);
  }

  const onGamePlayStart = ({ gameKey }) => {
    const socket = SOCKET.getSocket();
    socket.emit('createGame', {
      gameKey,
      gameId: id,
      adminId: admin._id
    }, (game) => {
      console.log('New Game created', game)
    });
    // emit event
    history.push(`/admin/game-play/${gameKey}`);
  }

  return (
    <Layout logout={handleLogout} logoutBtnLoading={adminLogoutBtnLoading}>
      <>
        {isAdminLoggedIn && isAuthenticated ? (
          <div className={styles.dashboardContainer}>
            <section className={styles.gameHeader}>
              <h2>Name: {_get(game, "gameName")}</h2>
              <div>
                <Button onClick={handleOnAddRound} type="primary">Add Round</Button>
                <Button onClick={showParticipentsModal} type="secondary">Add Participends</Button>
                <Button loading={isSaveButtonLoading} style={{ background: "#ed901e", color: "#fff" }} onClick={handleSaveGame} type="secondary">Save</Button>
                <Button onClick={handlePlayButtonClick} style={{ background: "#0ab261", color: "#fff" }}>Play</Button>
              </div>
            </section>
            
            {_size(participents) ?
              <>
                <h2>{_size(participents)}</h2>
                {_map(participents, (p, i) => (
                  <h4>{`${i} -> team : ${p.teamName} password : ${p.password}`}</h4>
                ))}
              </> : <h3> No participents added yet, please add participents to play</h3>
            }
            {_map(rounds, (r, i) => (
              <section
                style={{
                  background: i % 2 ? "rgba(209,209,209,0.5)" : "#fff",
                  padding: '40px 0'
                }}
              >
                <Rounds dataSource={r} roundIndex={i} />
              </section>
            ))}
          </div>
        ) : (
          <h1 style={{ color: "#ff00ff" }}>Loading</h1>
        )}

        <AddRoundModal
          isAddRoundModalVisible={isAddRoundModalVisible}
          onSubmit={handleOnAddRoundSubmit}
          hideModal={handleOnAddRoundHide}
        />

        <AddParticipentsModal
          participentData={null}
          modalVisibility={participentModalVisibility}
          onSubmit={handleParticipentModalSubmit}
          hideModal={handleHideParticipentModal}
        />

        <StartGame
          isModalVisible={startGameModalVisible}
          handleCancel={() => setstartGameModalVisible(false)}
          onSubmit={onGamePlayStart}
        />
      </>
    </Layout>
  );
}

export default AdminGameEditPage;
