import { Order } from '@/types/data.types';
import * as React from 'react';
import {  Text, StyleSheet, View, TouchableOpacity, Modal, FlatList} from 'react-native';
import { color } from 'react-native-reanimated';
import { useState } from 'react';

export const ProductItem = ({product}) => {

    return (
      <View style={styles.itemContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.modalText}>{product.item.product.name}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.modalText}>${product.item.price}</Text>
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
    borderBottomColor: "#FFF",
    borderWidth: 10,
    marginTop: 30
  },
  subContainer: {
      flexDirection: "column",
      marginHorizontal: 10,
      flex: 1,
      alignItems: "stretch"
  },
  orderText: {
    fontSize: 20,
    color: "#03312E",
  },
  modalView: {
    backgroundColor: "#03312E",
    alignSelf: 'center',
    marginTop: 20,
    padding: 40,
  },
  modalHeader: {
    fontSize: 48,
    color: "#FFF",
    alignSelf: "center"
  },
  modalText: {
    fontSize: 32,
    color: "#FFF"
  },
  closeButton: {
    borderBottomColor: "#FFF",
    borderBottomWidth: 4,
    alignSelf: 'center'
  }
});

