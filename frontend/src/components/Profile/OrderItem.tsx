import { Order } from '@/types/data.types';
import * as React from 'react';
import {  Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import { Dispatch, SetStateAction } from 'react';
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
      <View style={styles.orderItem}>
        <TouchableOpacity onPress={() => { setAccordian({ ...accordian, [item._id]: !accordian[item._id] }) }}>
          <View style={styles.itemContainer}>
            
              <View style={styles.subContainer}>
                  <Text style={[styles.orderText]}>{formattedDate}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={[styles.orderText]}>{item.items.length}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={[styles.orderText, styles.status, { backgroundColor: (new Date("04/29/2023").getTime() < new Date(item.createdAt).getTime()) ? "#334": "#42b66d"}]}>
                  {(new Date("04/29/2023").getTime() < new Date(item.createdAt).getTime() ) ? "Pending" : "Complete"}
                </Text>
              </View>
              <View style={[styles.row, styles.priceRow]}>
                <View style={styles.subContainer}>
                    <Text style={[styles.orderText, styles.price]}>{item.total.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}</Text>
                </View>
                <View style={styles.subContainer}>
                  {(accordian[item._id]) ? <Icon name="chevron-up" size={18} color="#000" /> : <Icon name="chevron-down" size={18} color="#000" />}
                </View>
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
  priceRow: {
    width: 150,
  },
  status: {
    backgroundColor: '#334',
    color: '#fff',
    padding: 5,
    textTransform: 'uppercase',
    fontSize: 14,
    borderRadius: 5,
  },
  complete: {
    backgroundColor: '#42b66d',
  },
  price: {
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row'
  },
  orderItem: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,
    elevation: 1,
    margin: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    //borderColor: "#03312E",
    //borderBottomWidth: 1,
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
    backgroundColor: "#fff",
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
  },
  modalHeader: {
    fontSize: 18,
    color: "#113",
    alignSelf: "center"
  },
  modalText: {
    fontSize: 16,
    color: "#113"
  },
});

