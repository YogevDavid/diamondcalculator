import axios from 'axios';
import {
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';
import setAuthToken from '../../utils/setAuthToken';
const proxy = process.env.REACT_APP_PROXY;

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${proxy}/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const body = { name, email, password };

    try {
      const res = await axios.post(`${proxy}/users`, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      console.log(err);
      dispatch({ type: REGISTER_FAIL });
    }
  };

export const login = (email, password) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const body = { email, password };

  try {
    const res = await axios.post(`${proxy}/auth`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err;
    if (errors) {
      console.log(errors);
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
