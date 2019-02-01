import React from 'react';
import { Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { logOut } from '../redux/actions/index';

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => dispatch(logOut())
});

class Logout extends React.Component {
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
    return <Button title="Logout" onPress={this.signOutUser} />;
  }
}

Logout.propTypes = {
  dispatchLogout: PropTypes.func.isRequired
};

export default connect(
  undefined,
  mapDispatchToProps
)(Logout);
