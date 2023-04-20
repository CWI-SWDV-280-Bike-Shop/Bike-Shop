import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import OrdersAPI from '@api/orders.api';
import { OrderItem } from '@/types/data.types';

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    OrdersAPI.getAll().then((res) => setOrders(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Orders</Text>
      {orders &&
        orders.map((order) => (
          <View style={Layout.card} key={order?._id}>
            {/* <Text>{JSON.stringify(order)}</Text> */}
            <Text>ID: {order?._id}</Text>
            <Text>Customer: {order?.customer?.name}</Text>
            <Text>Items: {JSON.stringify(order.items)}</Text>
            {/* BACKEND: THESE OrderItems ARE NOT POPULATING! */}
            {/* {order.items &&
              order.items.map((item: OrderItem) => {
                <View key={item?._id}>
                  <Text>Item: {item?.product?.name}</Text>
                </View>;
              })} */}
          </View>
        ))}
    </View>
  );
};

export default ListOrders;
