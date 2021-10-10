import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "antd/dist/antd.css";

// pages
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import Game from './pages/Game';
import Participents from './pages/Participents';
import ParticipentsGamePlay from './pages/ParticipentsGamePlay';
import AdminGameEditPage from './pages/AdminGameEditPage';
import AdminGamePlayController from './pages/AdminGamePlay';
import ViewGame from './pages/ViewGame';

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/admin" exact component={Admin} />
    <Route path="/admin-dasboard" exact component={AdminDashboard} />
    <Route path="/admin-game/edit/:id" component={AdminGameEditPage} />
    <Route path="/admin/game-play/:gamekey" component={AdminGamePlayController} />
    <Route path="/join" exact component={Participents} />
    <Route path="/join/game" component={ParticipentsGamePlay} />
    <Route path="/watch/:gameKey" component={Game} />
    <Route path="/view" exact component={ViewGame} />
  </Router>
);

export default App;