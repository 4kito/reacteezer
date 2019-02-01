import React from 'react';
import { Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Styles from '../utils/Styles';
import { logOut } from '../redux/actions/index';

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => dispatch(logOut())
});

class Home extends React.Component {
  signOutUser = async () => {
    const { dispatchLogout } = this.props;
    try {
      await firebase.auth().signOut();
      dispatchLogout();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <View style={Styles}>
          <Text>{`Hi ${currentUser.email}`}</Text>
          <Button title="Logout" onPress={this.signOutUser} />
        </View>
      );
    }
    return null;
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  dispatchLogout: PropTypes.func.isRequired
};

export default connect(
  state => ({
    currentUser: state
  }),
  mapDispatchToProps
)(Home);
