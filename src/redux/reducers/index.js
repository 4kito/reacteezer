import { ADD_ARTICLE } from '../../config/action-types';

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    if (state.articles.findIndex(article => article.id === action.payload.id) === -1) {
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
      });
    }
  }
  return state;
}
export default rootReducer;
