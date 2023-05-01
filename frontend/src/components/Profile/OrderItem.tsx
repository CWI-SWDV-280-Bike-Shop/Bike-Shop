import { Order } from '@/types/data.types';
import * as React from 'react';
import {  Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { color } from 'react-native-reanimated';

export const OrderItem = ({item}) => {
    return (
      <TouchableOpacity style={(styles.itemContainer)}>
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>{item.createdAt}</Text>
        </View>
        <View style={styles.subContainer}>
        <Text style={[styles.orderText]}>{item.items.length}</Text>
        </View>
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>${item.total}</Text>
        </View>
      </TouchableOpacity>  
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

