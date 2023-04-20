import React from 'react';
import { View, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import AddOrders from './Orders/AddOrders';
import ListOrders from './Orders/ListOrders';

const Orders = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Orders</Text>
      <AddOrders />
      <ListOrders />
    </View>
  );
};

export default Orders;
