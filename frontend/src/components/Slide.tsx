import * as React from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BounceInLeft } from 'react-native-reanimated';

export const Slide = ({ name, description, imgSrc, btnName }) => {
  return (
    <ImageBackground source={imgSrc} style={[styles.backgroundImage]}>
      <View style={styles.overlay}></View>
      <View style={[styles.container]}>
        <Text style={[styles.heading]}>{name}</Text>
        <Text style={[styles.bodyText]}>{description}</Text>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText]}>{btnName}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF85',
    padding: 20,
    textAlign: 'center',
    borderRadius: 5,
  },
  heading: {
    fontSize: 28,
  },
  bodyText: {
    fontSize: 18,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderColor: '#03312E',
    borderWidth: 2,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#03312E',
  },
});