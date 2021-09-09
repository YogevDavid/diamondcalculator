import {
  CALCLOGIC_ERROR,
  EDIT_CALCLOGIC,
  GET_CALCLOGIC,
} from '../actions/types';

const initialState = {
  calcLogics: [],
  calcLogic: {},
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CALCLOGIC:
    case EDIT_CALCLOGIC:
      return {
        ...state,
        calcLogic: payload,
      };

    case CALCLOGIC_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
