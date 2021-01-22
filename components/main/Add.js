import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { set } from 'react-native-reanimated';

export default function Add({ navigation }) {
  const [hasCameraPermission, setCameraHasPermission] = useState(null);
  const [hasGalleryPermission, setGalleryHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const settingImage = (image) => {
    console.log(image);
    setImage(image.uri);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setCameraHasPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryHasPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if(camera) {
      const data = await camera.takePictureAsync(null);
      settingImage(data);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      settingImage(result);
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
      <Button title="Save"
              onPress={() => navigation.navigate('Save', {image})} />

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
