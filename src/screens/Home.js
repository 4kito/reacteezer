import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../utils/Styles';
import Playlists from '../components/Playlists';

const mapStateToProps = state => ({
  currentUser: state.user,
  playlists: state.playlists
});

const Home = (currentUser, playlists, navigation) => ({
  render() {
    if (currentUser && playlists) {
      return <Playlists navigation={navigation} />;
    }
    return null;
  }
});

export default connect(mapStateToProps)(Home);
