import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import Styles from '../utils/Styles';
import { logIn, addPlaylist } from '../redux/actions/index';

const mapDispatchToProps = dispatch => ({
  dispatchLogin: user => dispatch(logIn(user)),
  dispatchAddPlaylist: playlist => dispatch(addPlaylist(playlist))
});

class Loading extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-console
    console.disableYellowBox = true;
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate('Login');
      }
      const { dispatchLogin } = this.props;
      dispatchLogin(user);
      this.getPlaylists(user);
    });
  }

  getPlaylists = currentUser => {
    const { dispatchAddPlaylist, navigation } = this.props;
    let arrItems = [];
    const db = firebase.firestore();
    const playlists = db.collection('playlists');
    // eslint-disable-next-line no-unused-vars
    if (currentUser) {
      const query = playlists
        .where('user', '==', currentUser.uid)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return;
          }
          snapshot.forEach(doc => {
            db.collection(`playlists/${doc.id}/tracks`)
              .get()
              .then(subCollectionSnapshot => {
                arrItems = [];
                subCollectionSnapshot.forEach(subDoc => {
                  const item = {
                    uid: subDoc.id,
                    title: subDoc.data().title,
                    album: subDoc.data().album,
                    artist: { name: subDoc.data().artist.name }
                  };
                  arrItems.push(item);
                });
                const item = {
                  uid: doc.id,
                  title: doc.data().title,
                  tracks: arrItems
                };
                dispatchAddPlaylist(item);
                navigation.navigate('Home', { navigation });
              });
          });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log('Error getting documents', err);
        });
    }
  };

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
  dispatchLogin: PropTypes.func.isRequired,
  dispatchAddPlaylist: PropTypes.func.isRequired
};

export default connect(
  undefined,
  mapDispatchToProps
)(Loading);
