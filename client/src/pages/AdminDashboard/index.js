import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import CreateGameModal from "../../components/modals/createGame";
import { useAdminContext } from "../../contexts/AdminContext";
import { useGameContext } from "../../contexts/GameContext";
import Layout from "../../components/Layout";
import Plus from "../../components/Plus";
import GameCard from "../../components/GameCard";

import styles from "./adminDashboard.module.scss";

function AdminDashboard({ history }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAdminLoggedIn, isAuthenticated, admin } = useAdminContext();
  const { getAllGames, addNewGame, onAdminOnBoard } = useGameContext();
  const games = getAllGames();

  const onSubmit = (res) => {
    console.log("result", res);
    addNewGame(res);
    hideModal();
  };

  const hideModal = () => setIsModalVisible(false);

  useEffect(() => {
    if (!isAdminLoggedIn && isAuthenticated) {
      history.push("/admin");
    }
    if (!_isEmpty(admin)) {
      // load saved games from database and show
      const _games = _get(admin, 'games', [])
      onAdminOnBoard(_games);
    }
  }, [isAdminLoggedIn, history, isAuthenticated, admin]);

  return (
    <Layout>
      <>
        {isAuthenticated && isAdminLoggedIn ? (
          <div className={styles.dashboardContainer}>
            {_map(games, (game) => (
              <GameCard key={game.gameId} data={game} onClickEdit={() => history.push(`/admin-game/edit/${game.gameId}`)}/>
            ))}
            <Plus onClickPlus={() => setIsModalVisible(true)} />
          </div>
        ) : (
          <h1 style={{ color: "#ff00ff" }}>Loading Games</h1>
        )}
        <CreateGameModal
          onSubmit={onSubmit}
          isModalVisible={isModalVisible}
          hideModal={hideModal}
        />
      </>
    </Layout>
  );
}

export default AdminDashboard;
