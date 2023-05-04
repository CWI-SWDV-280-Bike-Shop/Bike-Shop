import * as React from 'react';
import {  Text, StyleSheet, View, ImageBackground} from 'react-native';

export const ProductItem = ({product}) => {

    return (
      <View style={styles.itemContainer}>
          <View style={styles.subContainer}>
            <View style={styles.picture}>
              <ImageBackground source={require("../../assets/Images/stolen_bike_image.jpg")} resizeMode="contain" style={styles.backgroundimage}>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.modalText}>{product.item.product.name}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.modalText}>{product.item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}</Text>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
  picture: {
    width: 100,
    height: 100,
    margin: 10,
  }, 
  backgroundimage: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 10
  },
  subContainer: {
      flexDirection: "column",
      marginHorizontal: 10,
      flex: 1,
      alignItems: "stretch"
  },
  orderText: {
    fontSize: 14,
    color: "#113",
  },
  modalText: {
    fontSize: 18,
    color: "#113"
  },
});

