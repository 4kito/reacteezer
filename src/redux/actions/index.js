import { ADD_ARTICLE, DELETE_ARTICLE } from '../../config/action-types';

export const addArticle = payload => ({ type: ADD_ARTICLE, payload });
export const deleteArticle = payload => ({ type: DELETE_ARTICLE, payload });
