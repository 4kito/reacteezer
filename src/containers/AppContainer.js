import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PropTypes from 'prop-types';
import { addArticle } from '../redux/actions/index';
import store from '../redux/configureStore';

store.subscribe(() => console.log(store.getState()));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const HomeScreen = ({ navigation }) => (
  <View style={styles}>
    <Text>Home</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    <Button
      onPress={() => store.dispatch(addArticle({ title: `React test`, id: 1 }))}
      title="React test"
    />
  </View>
);

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const DetailsScreen = () => (
  <View style={styles}>
    <Text>Details Screen</Text>
  </View>
);

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
