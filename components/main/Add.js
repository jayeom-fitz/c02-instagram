import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add() {
  const [hasCameraPermission, setCameraHasPermission] = useState(null);
  const [hasGalleryPermission, setGalleryHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setCameraHasPermission(cameraStatus.state === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryHasPermission(galleryStatus.state === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if(camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No Access to Camera or Gallery</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.fixedRatio} 
                type={type} 
                ratio={'1:1'}
                ref={ref => setCamera(ref)}/>
      </View>

      <Button style={{ 
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',      
              }}
              title="Flip Image"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
      </Button>

      <Button title="Take Picture"
              onPress={() => takePicture()} />
      <Button title="Pick Image From Gallery"
              onPress={() => pickImage()} />

      {image && 
        <Image source={{uri: image}}
              style={{flex : 1}}/>}
    </View>
  );
}

const styles = StyleSheet.create({ 
  cameraContainer: {
    flex : 1,
    flexDirection : 'row',
  },
  fixedRatio : {
    flex : 1,
    aspectRatio : 1,
  },
});
