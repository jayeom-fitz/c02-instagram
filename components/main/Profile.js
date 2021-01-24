import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar'

import { connect } from 'react-redux'
import firebase from 'firebase'
require('firebase/firestore');

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;

    if(props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase.firestore().collection("users")
      .doc(props.route.params.uid)
      .get()
      .then((snapshot) => {
        if(snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log('does not exist');
        }
      })

      firebase.firestore().collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });

        setUserPosts(posts);
      })
    }
  }, [props.route.params.uid]);

  if(user === null) {
    return <View />
  }

  const onFollow = () => {
    firebase.firestore().collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({})
  }

  const onUnfollow = () => {
    firebase.firestore().collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete()
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6666dd" />
     
      <View style={styles.containerInfo}>
        <Text>{user.email}</Text>
        <Text>{user.name}</Text>

        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Unfollowing"
                      onPress={() => onUnfollow()} />
            ) : (
              <Button title="Following"
                      onPress={() => onFollow()} />  
            )}
          </View>
        ) : null}
      </View>
      <View style={styles.containerGallery}>
        <FlatList numColumns={3}
                  horizontal={false}
                  data={userPosts} 
                  renderItem={({item}) => (
                    <View style={styles.containerImage}>
                      <Image style={styles.image}
                            source={{uri : item.downloadURL}}/>
                    </View>
                  )}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo : {
    flex: 1,
  },
  containerGallery : {
    flex: 1,
  },
  containerImage : {
    flex: 1/3,
  },
  image: {
    flex: 1,
    aspectRatio: 1/1
  }
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);

