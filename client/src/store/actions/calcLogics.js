import axios from 'axios';
import { CALCLOGIC_ERROR, EDIT_CALCLOGIC, GET_CALCLOGIC } from './types';
const proxy = process.env.REACT_APP_PROXY;

export const editCalcLogicValues = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${proxy}/calcLogics/edit`, formData, config);

    dispatch({
      type: EDIT_CALCLOGIC,
      payload: res.data,
    });

    dispatch(console.log('CalcLogic Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CALCLOGIC_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const getCalcLogic = () => async (dispatch) => {
  try {
    const res = await axios.get(`${proxy}/calcLogics/getCalcLogic`);

    dispatch({
      type: GET_CALCLOGIC,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CALCLOGIC_ERROR,
      payload: { msg: err, status: err },
    });
  }
};
