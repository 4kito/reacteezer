import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Styles from '../utils/Styles';
import { logIn } from '../redux/actions/index';

const mapDispatchToProps = dispatch => ({
  dispatchLogin: user => dispatch(logIn(user))
});

class Loading extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-console
    console.disableYellowBox = true;
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      const { dispatchLogin } = this.props;
      dispatchLogin(user);
      navigation.navigate(user ? 'Home' : 'Login');
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

Loading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  dispatchLogin: PropTypes.func.isRequired
};

export default connect(
  undefined,
  mapDispatchToProps
)(Loading);
