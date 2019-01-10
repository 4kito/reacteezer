import { LOGIN } from '../../config/action-types';

const initialStore = {
  auth: {
    isLogged: false
  }
};

function authReducer(state = initialStore.auth, action) {
  if (action.type === LOGIN) {
    return Object.assign(state, {
      isLogged: action.payload.isLogged
    });
  }
  return state;
}

export default authReducer;
