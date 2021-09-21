import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "antd/dist/antd.css";

// pages
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import Game from './pages/Game';
import Participents from './pages/Participents';
import AdminGameEditPage from './pages/AdminGameEditPage';

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/admin" exact component={Admin} />
    <Route path="/admin-dasboard" exact component={AdminDashboard} />
    <Route path="/admin-game/edit/:id" component={AdminGameEditPage} />
    <Route path="/game" component={Game} />
    <Route path="/play" component={Participents} />
  </Router>
);

export default App;