import { Order } from '@/types/data.types';
import * as React from 'react';
import {  Text, StyleSheet, View, TouchableOpacity, Modal, FlatList} from 'react-native';
import { color } from 'react-native-reanimated';
import { Dispatch, SetStateAction, useState } from 'react';
import { ProductItem } from './ProductItem';
import Icon from 'react-native-vector-icons/Ionicons';

export const OrderItem = ({item, accordian, setAccordian} : {item: Order, accordian: {}; setAccordian: Dispatch<SetStateAction<{}>>}) => {

    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    

    return (
      <View>
        <TouchableOpacity onPress={() => { setAccordian({ ...accordian, [item._id]: !accordian[item._id] }) }}>
          <View style={styles.itemContainer}>
            
              <View style={styles.subContainer}>
                  <Text style={[styles.orderText]}>{formattedDate}</Text>
              </View>
              <View style={styles.subContainer}>
              <Text style={[styles.orderText]}>{item.items.length}</Text>
              </View>
              <View style={styles.subContainer}>
                  <Text style={[styles.orderText]}>${item.total}</Text>
              </View>
              <View style={styles.subContainer}>
                {(accordian[item._id]) ? <Icon name="chevron-up" size={18} color="#000" /> : <Icon name="chevron-down" size={18} color="#000" />}
              </View>
          </View>
        </TouchableOpacity>
        <View style={[styles.modalView, { display: (accordian[item._id]) ? 'flex' : 'none' }]}>
          <Text style={styles.modalHeader}>Order #{item._id}</Text>

          <FlatList
            data={item.items}
            renderItem={(product) => <ProductItem product={product} />}
          />
        </View>
      </View>
    );

};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
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
    alignSelf: 'center',
  }
});

