import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { OrderItem } from './OrderItem';
import { Order } from '@/types/data.types';
import { useState } from 'react';

export const OrderList = ({orders}: {orders: Order[]}) => {
    const [accordian, setAccordian] = useState({});
    return (
      <ScrollView>
{/*         <View style={(styles.itemContainer)}>
          <View style={styles.subContainer}>
              <Text style={[styles.orderText]}>Date:</Text>
          </View>
          <View style={styles.subContainer}>
          <Text style={[styles.orderText]}># of Items:</Text>
          </View>
          <View style={styles.subContainer}>
              <Text style={[styles.orderText]}>Total:</Text>
          </View>
        </View> */}
        <View style={styles.orderList}>
            <FlatList
              data={orders}
              renderItem={({item}) => <OrderItem item={item} accordian={accordian} setAccordian={setAccordian} />}
            />
        </View>
      </ScrollView>  
    ); 
};

const styles = StyleSheet.create({
  orderList: {
    marginHorizontal: 'auto',
    maxWidth: 1200,
    minWidth: 800,
    flex: 1,
  },
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

