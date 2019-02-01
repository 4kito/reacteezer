import { LOGIN, LOGOUT } from '../../config/action-types';

const initialState = null;

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

export default authReducer;
