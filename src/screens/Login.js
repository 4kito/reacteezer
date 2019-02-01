import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import Styles from '../utils/Styles';

class Login extends React.Component {
  state = { email: '', password: '', errorMessage: '' };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { navigation } = this.props;
    const { email, password, errorMessage } = this.state;

    return (
      <View style={Styles.container}>
        <Text>Login</Text>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
        <TextInput
          style={Styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <TextInput
          secureTextEntry
          style={Styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

export default Login;
