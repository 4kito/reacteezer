import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Logout from './Logout';

const iconFile = require('../assets/icon.png');

const Drawer = () => (
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
    >
      <Image
        source={iconFile}
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

export default Drawer;
