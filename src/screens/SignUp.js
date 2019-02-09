import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Styles from '../utils/Styles';

class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: '' };

  handleSignUp = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(navigation.navigate('Home', { navigation }))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <View style={Styles.container}>
        <Text>Sign Up</Text>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={Styles.textInput}
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={Styles.textInput}
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

SignUp.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

export default SignUp;
