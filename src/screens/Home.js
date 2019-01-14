import React from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import Styles from '../utils/Styles';

class Home extends React.Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;

    console.log(currentUser);
    if (currentUser) {
      return (
        <View style={Styles}>
          <Text>{`Hi ${currentUser.email}`}</Text>
        </View>
      );
    }
    return null;
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

export default Home;
