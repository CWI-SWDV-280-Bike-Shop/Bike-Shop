import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import {  Text, StyleSheet, View } from 'react-native';
import { OrderList } from '@/components/Profile/OrderList';
import { AuthContext } from '@/context/auth.context';
import OrderAPI from '@/api/order.api';
import { Order } from '@/types/data.types';

export const Orders = () => { 
    const { isLoggedIn, authUser } = useContext(AuthContext);
    const [orders, setOrders] = useState([] as Order);

    // retrieves orders for user
    useEffect(() => {
      OrderAPI.getAll()
              .then((res) => {
                setOrders(res.data); 
              })
    }, []);

    console.log(orders);

    return (
      <View style={[styles.container]}>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.header]}>Orders</Text>
          <Text style={[styles.bodyText]}>
            Recent orders for your account: 
          </Text>
          <OrderList orders={orders}/>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D3D5D4',
  }, 
  header: {
    margin: 20,
    fontSize: 48,
    color: "#262626"
  },
  bodyText: {
    marginHorizontal: 20,
    fontSize: 24,
    color: "#262626"
  },
});

const testOrders = [
  {
      date: "01/23/2022",
      price: 1535.69,
      products: ["Specialized Mountain bike", "Giro Helmet"]
  },
  {
      date: "02/04/2022",
      price: 155.72,
      products: ["Chain", "Tube", "Tires"]
  },
  {
      date: "12/16/2022",
      price: 460.25,
      products: ["Repair"]
  }
];