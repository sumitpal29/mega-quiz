import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { message } from 'antd';
import axios from 'axios';
// lodash
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _isEmpty from 'lodash/isEmpty';
// local
import { processResponse } from '../actions';
import CONSTANTS from '../constants/general';

const AdminContext = createContext(null);

function AdminProvider(props) {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);



  useEffect(() => {
    const token = localStorage.getItem(CONSTANTS.TOKEN);
    verfyAdmin(token).then(d => {
      console.log(d);
      setAdmin(d);
      setToken(_get(d, 'token'));
    });
    
    setIsAuthenticated(true);
  }, []);

  const adminSignUp = useCallback(async ({username, password}, onSuccess, orError) => {
    const res = await axios.post('http://localhost:5000/api/admin-signup', { username, password });
    processResponse(res, (d) => {
      if (_isFunction(onSuccess)) onSuccess(d);
    }, err => _isFunction(orError) ? orError(err) : message.error(err.message));
  }, []);

  const adminLogIn = async ({ username, password }, onSuccess, orError) => {
    setIsAuthenticating(true);
    const res = await axios.post('http://localhost:5000/api/admin-login', {username, password});
    setIsAuthenticating(false);
    setIsAdminLoggedIn(true);
    return processResponse(res, (d) => {
      const received_token = _get(d, CONSTANTS.TOKEN);
      setToken(received_token)
      localStorage.setItem(CONSTANTS.TOKEN, received_token);
      setAdmin({
        username
      });
      // load games
      if (_isFunction(onSuccess)) onSuccess(d);
      return d;
    }, err => _isFunction(orError) ? orError(err) : message.error(err.message));
  };

  const verfyAdmin = async (token) => {
    if(_isEmpty(token)) return false;
    setIsAuthenticating(true);
    const res = await axios.post('http://localhost:5000/api/admin/verify', { token });
    setIsAuthenticating(false);
    setIsAdminLoggedIn(true);
    return processResponse(res, (d) => {
      setIsAdminLoggedIn(true);
      return d;
    }, e => {
      setIsAdminLoggedIn(false);
      return false
    });
  };

  const saveGame = async (games, onSuccess, orError) => {
    if(_isEmpty(games)) return false;
    try {
      const res = await axios.post('http://localhost:5000/api/admin/update-game', { updates: { games }, token });
      if (_isFunction(onSuccess)) onSuccess(res);
      return res;
    } catch (err) {
      _isFunction(orError) ? orError(err) : message.error(err.message);
    }
  }

  const adminLogout = async (onSuccess, orError) => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/logout', {token});
      if (_isFunction(onSuccess)) onSuccess(res);
      localStorage.removeItem(CONSTANTS.TOKEN);
      setIsAdminLoggedIn(false);
      return res;
    } catch (err) {
      _isFunction(orError) ? orError(err) : message.error(err.message);
    }
  };

  return (
    <AdminContext.Provider
        value={{
          admin,
          adminSignUp,
          adminLogIn,
          verfyAdmin,
          isAdminLoggedIn,
          isAuthenticated,
          saveGame,
          adminLogout,
          isAuthenticating
        }}
        {...props}
    />
  );
}

const useAdminContext = () => useContext(AdminContext);

export { AdminProvider, useAdminContext };

