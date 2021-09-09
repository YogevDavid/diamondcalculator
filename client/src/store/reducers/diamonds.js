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
} from '../actions/types';

const initialState = {
  diamonds: [],
  diamond: null,
  newDiamond: null,
  similarDiamonds: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DIAMONDS:
      return {
        ...state,
        diamonds: payload,
      };
    case GET_DIAMOND:
    case EDIT_DIAMOND:
    case UPLOADED_PHOTO:
      return {
        ...state,
        diamond: payload,
      };
    case FIND_SIMILAR:
      return {
        ...state,
        similarDiamonds: payload,
      };
    case CLEAR_DIAMOND:
      return {
        ...state,
        newDiamond: null,
      };
    case ADD_DIAMOND:
      return {
        ...state,
        newDiamond: payload,
        diamonds: [payload, ...state.diamonds],
      };
    case DIAMOND_ERROR:
      return {
        ...state,
        error: payload,
      };
    case DELETE_DIAMOND:
      return {
        ...state,
        diamonds: state.diamonds.filter((diamond) => diamond._id !== payload),
      };

    default:
      return state;
  }
}
