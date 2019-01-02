import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/configureStore';
import AppContainer from './src/containers/AppContainer';
// import * as firebase from 'firebase';
// import firebaseConfig from './src/config/firebase';

// firebase.initializeApp(firebaseConfig);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
