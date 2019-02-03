import { createStore } from 'redux';
import authReducer from './reducers/index';

const store = createStore(authReducer);

export default store;
