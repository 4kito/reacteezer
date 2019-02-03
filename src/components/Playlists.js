/* eslint-disable no-console */
import React from 'react';
import { Modal, Text, View, Alert, Button } from 'react-native';
import { Input } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatList from './FlatList';
import Styles from '../utils/Styles';
import { addPlaylist, removePlaylist } from '../redux/actions/index';

class Playlists extends React.Component {
  state = {
    isModalVisible: false,
    text: null
  };

  onLongPress(uid) {
    Alert.alert(
      'Suppression de la playlist',
      'Confirmer la suppression de la playlist',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.removePlaylist(uid);
          }
        }
      ],
      { cancelable: false }
    );
  }

  submitPlaylist = () => {
    const db = firebase.firestore();
    // eslint-disable-next-line react/prop-types
    const { currentUser, dispatchAddPlaylist, navigation } = this.props;
    const { text } = this.state;
    db.collection('playlists')
      .add({
        title: text,
        user: currentUser.uid
      })
      .then(doc => {
        const item = {
          uid: doc.id,
          title: text
        };
        dispatchAddPlaylist(item);
        navigation.navigate('Home', { reloaded: true });
        this.toggleModal();
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.log('Error writing document: ', error);
      });
  };

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  removePlaylist(uid) {
    const { dispatchRemovePlaylist, navigation } = this.props;
    const db = firebase.firestore();
    db.collection('playlists')
      .doc(uid)
      .delete()
      .then(() => {
        dispatchRemovePlaylist(uid);
        navigation.navigate('Home', { reloaded: true });
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

  render() {
    const { isModalVisible } = this.state;
    const { navigation, playlists } = this.props;
    if (playlists) {
      return (
        <View style={Styles.container}>
          <FlatList
            data={playlists}
            onPress={item => {
              navigation.navigate('Tracks', {
                uid: item.uid
              });
            }}
            onLongPress={uid => this.onLongPress(uid)}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Ajouter une nouvelle playlist</Text>
              <Input
                style={{ height: 40, marginBottom: 20 }}
                placeholder="Nom de votre playlist"
                onChangeText={text => this.setState({ text })}
              />
              <Button title="ok" onPress={this.submitPlaylist} />
            </View>
            <ActionButton buttonColor="red" buttonText="-" onPress={this.toggleModal} />
          </Modal>
          <ActionButton buttonColor="green" onPress={this.toggleModal} />
        </View>
      );
    }
    return (
      <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Aucune playlist trouvé !</Text>
        <Text>Ajouter une nouvelle playlist</Text>
        <Input
          style={{ height: 40 }}
          placeholder="Nom de votre playlist"
          onChangeText={text => this.setState({ text })}
        />
        <Button title="ok" onPress={this.submitPlaylist} />
      </View>
    );
  }
}

Playlists.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  playlists: PropTypes.instanceOf(Array).isRequired,
  dispatchAddPlaylist: PropTypes.func.isRequired,
  dispatchRemovePlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.user,
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({
  dispatchAddPlaylist: playlist => dispatch(addPlaylist(playlist)),
  dispatchRemovePlaylist: playlist => dispatch(removePlaylist(playlist))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
