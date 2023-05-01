import { Orders } from '@/pages/Profile/orders';
import * as React from 'react';
import {  Text, StyleSheet, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { OrderItem } from './OrderItem';

export const OrderList = ({orders}) => {

    return (
      <ScrollView>
      <View style={(styles.itemContainer)}>
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>Date:</Text>
        </View>
        <View style={styles.subContainer}>
        <Text style={[styles.orderText]}># of Items:</Text>
        </View>
        <View style={styles.subContainer}>
            <Text style={[styles.orderText]}>Total:</Text>
        </View>
      </View>
          <FlatList
            data={orders}
            renderItem={({item}) => <OrderItem item={item} />}
          />
      </ScrollView>  
    ); 
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 20
  },
  subContainer: {
      flexDirection: "column",
      marginHorizontal: 10,
      flex: 1,
      alignItems: 'center'
  },
  orderText: {
    fontSize: 30,
    color: "#03312E",
  }
});

