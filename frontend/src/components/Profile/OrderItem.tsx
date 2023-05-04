import { Order } from '@/types/data.types';
import * as React from 'react';
import {  Text, StyleSheet, View, TouchableOpacity, Modal, FlatList} from 'react-native';
import { color } from 'react-native-reanimated';
import { useState } from 'react';
import { ProductItem } from './ProductItem';

export const OrderItem = ({item}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [order, setOrder] = useState({} as Order);

    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    

    return (
      <View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='slide'
      >
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Order #{order._id}</Text>

          <FlatList
            data={order.items}
            renderItem={(product) => <ProductItem product={product} />}
          />
        
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.modalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>


      <TouchableOpacity 
        style={(styles.itemContainer)}
        onPress={() => {
          setOrder(item);
          setModalVisible(true);
          console.log(order.items)
        }}
      >
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>{formattedDate}</Text>
        </View>
        <View style={styles.subContainer}>
        <Text style={[styles.orderText]}>{item.items.length}</Text>
        </View>
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>${item.total}</Text>
        </View>
      </TouchableOpacity>  
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

