import React from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import store from './src/redux/configureStore';
import Routes from './src/Routes';
import firebaseConfig from './src/config/firebase';

firebase.initializeApp(firebaseConfig);
const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
