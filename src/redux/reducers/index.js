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

const initialState = {
  user: null,
  playlists: []
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return null;
    case UPDATE_PROFILE:
      return { ...state, ...action.payload };
    case COLLECTION:
      return { ...state, playlists: action.payload };
    case REMOVE_PLAYLIST:
      return {
        playlists: state.playlists.filter(playlist => playlist.uid !== action.payload),
        user: state.user
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, action.payload]
      };
    case REMOVE_TRACK:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          tracks: {
            ...state.playlist[action.payload.index].tracks,
            ...state.playlists[action.payload.index].tracks.filter(
              track => track.uid !== action.payload.uid
            )
          }
        }
      };
    case ADD_TRACK:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          tracks: {
            ...state.playlists.tracks,
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
}

export default mainReducer;
