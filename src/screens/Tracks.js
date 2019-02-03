import React from 'react';
import { View, Alert, ActivityIndicator, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { removeTrack } from '../redux/actions/index';
import Styles from '../utils/Styles';
import FlatList from '../components/FlatList';

class Tracks extends React.Component {
  state = {
    tracks: null,
    loaded: false
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { navigation, playlists } = this.props;
    const uid = navigation.getParam('uid');
    const playlist = playlists.filter(item => item.uid === uid);
    this.setState({ tracks: playlist[0].tracks, loaded: true });
  }

  onLongPress(uid) {
    Alert.alert(
      'Suppression de la track',
      'Confirmer la suppression de la track',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.removeTrack(uid);
          }
        }
      ],
      { cancelable: false }
    );
  }

  removeTrack(uid) {
    const { tracks } = this.state;
    const { navigation, dispatchRemoveTrack } = this.props;
    const playlistUid = navigation.getParam('uid');
    const db = firebase.firestore();
    db.collection(`playlists/${playlistUid}/tracks/`)
      .doc(uid)
      .delete()
      .then(() => {
        this.setState({
          tracks: tracks.filter(track => track.uid !== uid)
        });

        dispatchRemoveTrack(uid);
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

  render() {
    const { loaded, tracks } = this.state;
    const { navigation } = this.props;
    const playlistUid = navigation.getParam('uid');
    if (!loaded) {
      return (
        <View style={Styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (tracks.length > 0) {
      return (
        <View style={Styles.container}>
          <FlatList data={tracks} onPress={() => {}} onLongPress={uid => this.onLongPress(uid)} />
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={() => {
              navigation.navigate('Search', {
                uid: playlistUid
              });
            }}
          />
        </View>
      );
    }
    return (
      <View style={Styles.container}>
        <Text style={{ marginTop: 22, alignItems: 'center' }}>Aucun morceau trouvé !</Text>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            navigation.navigate('Search', {
              uid: playlistUid
            });
          }}
        />
      </View>
    );
  }
}

Tracks.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  dispatchRemoveTrack: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  dispatchRemoveTrack: track => dispatch(removeTrack(track))
});

const mapStateToProps = state => ({
  currentUser: state.user,
  playlists: state.playlists
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
