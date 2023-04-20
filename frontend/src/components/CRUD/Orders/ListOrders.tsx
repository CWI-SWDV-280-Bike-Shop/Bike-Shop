import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import Orders from '@api/orders.api';

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Orders.getAll().then((res) => setOrders(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Bikes</Text>
      {orders &&
        orders.map((orders) => (
          <View style={styles.bike} key={orders._id}>
            <Text>ID: {orders._id}</Text>
            <Text>Customers: {orders.customer.toString()}</Text>
            <Text>Total: {orders.items.toString()}</Text>          
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bike: {
    margin: 10,
  },
});

export default ListOrders;
