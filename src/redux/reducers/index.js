import { LOGIN, LOGOUT, UPDATE_PROFILE } from '../../config/action-types';

const initialState = null;

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return null;
    case UPDATE_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default authReducer;
