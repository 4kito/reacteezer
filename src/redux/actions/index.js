import {
  LOGIN,
  LOGOUT,
  UPDATE_PROFILE,
  COLLECTION,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  ADD_TRACK,
  REMOVE_TRACK
} from '../../config/action-types';

export const logIn = user => ({ type: LOGIN, payload: user });

export const logOut = () => ({ type: LOGOUT });

export const updateProfile = picture => ({ type: UPDATE_PROFILE, payload: picture });

export const collection = playlists => ({ type: COLLECTION, payload: { playlists, index: 0 } });

export const addPlaylist = playlist => ({ type: ADD_PLAYLIST, payload: playlist });

export const removePlaylist = playlist => ({ type: REMOVE_PLAYLIST, payload: playlist });

export const addTrack = track => ({ type: ADD_TRACK, payload: track });

export const removeTrack = track => ({ type: REMOVE_TRACK, payload: track });
