import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar'

import { connect } from 'react-redux'

function Profile(props) {
  const { currentUser, posts } = props;

  console.log(posts);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerInfo}>
        <Text>{currentUser.email}</Text>
        <Text>{currentUser.name}</Text>
      </View>
      <View style={styles.containerGallery}>
        <FlatList numColumns={3}
                  horizontal={false}
                  data={posts} 
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

