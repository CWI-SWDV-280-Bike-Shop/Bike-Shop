import * as React from 'react';
import {  Text, StyleSheet, View,} from 'react-native';
import { color } from 'react-native-reanimated';

const renderProducts = ({item}) => {
  return item.products.map((product) => {
    return (
      <Text>{product}, </Text>
    );
  });
};

export const OrderItem = ({item}) => {
    return (
      <View style={(styles.itemContainer)}>
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>{item.date}</Text>
        </View>
        <View style={styles.subContainer}>
        <Text style={[styles.orderText]}>{
          renderProducts({item})
        }</Text>
        </View>
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>${item.price}</Text>
        </View>
      </View>  
    );

};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderColor: "#03312E",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  subContainer: {
      flexDirection: "column",
      marginHorizontal: 10,
      flex: 1,
      alignItems: 'center'
  },
  orderText: {
    fontSize: 20,
    color: "#03312E",
  }
});

