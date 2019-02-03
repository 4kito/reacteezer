import { LOGIN, LOGOUT, UPDATE_PROFILE } from '../../config/action-types';

export const logIn = user => ({ type: LOGIN, payload: user });

export const logOut = () => ({ type: LOGOUT });

export const updateProfile = picture => ({ type: UPDATE_PROFILE, payload: picture });
