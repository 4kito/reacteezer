import { LOGIN, LOGOUT } from '../../config/action-types';

export const logIn = user => ({ type: LOGIN, payload: user });

export const logOut = () => ({ type: LOGOUT });
