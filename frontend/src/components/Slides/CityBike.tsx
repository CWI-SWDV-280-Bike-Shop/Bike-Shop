import * as React from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BounceInLeft } from 'react-native-reanimated';

export const CityBike = () => {
  return (
    <ImageBackground
      source={require('../../Images/citybikestockimg.png')}
      style={[styles.backgroundImage]}
    >
      <View style={[styles.container]}>
        <Text style={[styles.heading]}>Road Bikes</Text>
        <Text style={[styles.bodyText]}>
          Shop our collection of bikes built for busy city streets.
        </Text>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText]}>Shop</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF85',
    padding: 15,
    textAlign: 'center',
    borderRadius: 5,
  },
  heading: {
    fontSize: 30,
  },
  bodyText: {
    fontSize: 18,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#62929E',
    padding: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
