import axios from 'axios';
import {
  GET_DIAMONDS,
  DIAMOND_ERROR,
  DELETE_DIAMOND,
  EDIT_DIAMOND,
  GET_DIAMOND,
  ADD_DIAMOND,
  UPLOADED_PHOTO,
  CLEAR_DIAMOND,
  FIND_SIMILAR,
} from './types';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const proxy = process.env.REACT_APP_PROXY;

export const addDiamond = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${proxy}/diamonds`, formData, config);

    dispatch({
      type: ADD_DIAMOND,
      payload: res.data,
    });

    dispatch(console.log('Diamond Created', 'success'));
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const clearNewDiamond = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_DIAMOND,
    });
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const getDiamonds = () => async (dispatch) => {
  try {
    const res = await axios.get(`${proxy}/diamonds/mydiamonds`);
    dispatch({
      type: GET_DIAMONDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: 'ERROR',
    });
  }
};

export const deleteDiamond = (id) => async (dispatch) => {
  try {
    await axios.get(`${proxy}/diamonds/delete/${id}`);

    dispatch({
      type: DELETE_DIAMOND,
      payload: id,
    });

    dispatch(console.log('Diamond Removed', 'success'));
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const editDiamondValues = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${proxy}/diamonds/edit/${formData._id}`,
      formData,
      config
    );

    dispatch({
      type: EDIT_DIAMOND,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const getDiamond = (diamondId) => async (dispatch) => {
  try {
    const res = await axios.get(`${proxy}/diamonds/diamond/${diamondId}`);

    dispatch({
      type: GET_DIAMOND,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const findSimilar = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${proxy}/diamonds/findsimilar`,
      formData,
      config
    );

    dispatch({
      type: FIND_SIMILAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const uploadPhoto = (uploadedPhoto, diamondId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${proxy}/diamonds/uploaddiamondimage/${diamondId}`,
      uploadedPhoto,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: UPLOADED_PHOTO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DIAMOND_ERROR,
      payload: { msg: err, status: err },
    });
  }
};
