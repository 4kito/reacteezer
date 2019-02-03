import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Permissions } from 'expo';
import Logout from './Logout';

const iconFile = require('../assets/icon.png');

class Drawer extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { navigation, currentUser } = this.props;
    if (hasCameraPermission === null) {
      return <View />;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 75
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            backgroundColor: '#fff',
            borderRadius: 100
          }}
          onPress={() => navigation.navigate('Camera')}
        >
          <Image
            source={currentUser && currentUser.photoURL ? { uri: currentUser.photoURL } : iconFile}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100
            }}
          />
        </TouchableOpacity>
        <Logout />
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default connect(state => ({ currentUser: state }))(Drawer);
