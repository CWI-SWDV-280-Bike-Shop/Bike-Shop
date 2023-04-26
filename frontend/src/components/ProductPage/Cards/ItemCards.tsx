import * as React from 'react';
import {  Text, StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ItemCard = ({name, price, imgSrc, btnName, stockStatus, color, size}) => {
    return (
          <View style={[styles.card]}>
            <View style={[styles.leftSide]}>
                <Image source={imgSrc} style={[styles.bikeImage]}/>
                <Text style={[styles.heading]}>{name}</Text>
                <Text style={[styles.bodyText]}>{price}</Text>
            </View>
            <View style={[styles.rightSide]}>
                <Text style={[styles.stockText]}>{stockStatus}</Text>
                {/* <Image source={imgSrc} style={[styles.stars]}/> */}
                <View style={[styles.descTextContainer]}>
                <Text style={[styles.descText]}>- {color}</Text>
                <Text style={[styles.descText]}>- {size}</Text>
                {/* <Text style={[styles.descText]}>- {brakes}</Text> */}
                </View>
                <TouchableOpacity style={[styles.button]}>
                    <Text style={[styles.buttonText]}>{btnName}</Text>
                </TouchableOpacity>
            </View>
          </View>
    );
};

const styles = StyleSheet.create({
  bikeImage: {
    width: 225,
    height: 150,
  },
  card: {
    backgroundColor: '#FFFFFF85',
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5
  },
  leftSide: {
    alignItems: 'center'
  },
  rightSide: {
    flex: 1,
    marginRight: 0,
    alignItems: 'center'
  },
  heading: {
      fontSize: 30,
  },
  bodyText: {
    fontSize: 20
  },
  stars: {
    flex: 1,
  },
  descTextContainer: {
    flex: 2,
    fontSize: 15
  },
  descText: {
    paddingVertical: 4
  },
  stockText: {
    flex: 1,
    fontSize: 15,
    color:'gray'
  },
  button: {
    backgroundColor: '#62929E',
    padding: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  }
});