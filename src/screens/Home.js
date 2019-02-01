import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../utils/Styles';

const Home = currentUser => ({
  render() {
    if (currentUser) {
      return (
        <View style={Styles}>
          <Text>{`Hi ${currentUser.email}`}</Text>
        </View>
      );
    }
    return null;
  }
});

export default connect(state => ({ currentUser: state }))(Home);
