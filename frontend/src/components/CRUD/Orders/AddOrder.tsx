import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import OrdersAPI from '@api/orders.api';
import { Order, User, OrderItem } from '@/types/data.types';
import { formatPrice } from '@/utilities/formatter';

const AddOrders = () => {
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState([{}] as [OrderItem]);
  const [total, setTotal] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState({} as Order);

  const handleSubmit = async () => {
    OrdersAPI.create(order).then((res) => setOrder(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add Order</Text>

      <Text>TODO</Text>

      {/* <Text>Customer</Text>
      <TextInput
        style={Layout.input}
        value={customer}
        onChangeText={(value) => setCustomer(value)}
      ></TextInput>

      <Text>Items</Text>
      <TextInput
        style={Layout.input}
        value={items}
        onChangeText={(value) => setItems(value)}
      ></TextInput>

      <Text>Total</Text>
      <TextInput
        style={Layout.input}
        value={total}
        onChangeText={(value) => setTotal(value)}
      ></TextInput> */}

      {/* <Button title="submit" onPress={handleSubmit} /> */}

      {submitted && (
        <View>
          <Text>_id: {order?._id}</Text>
          <Text>customer: {JSON.stringify(order.customer)}</Text>
          <Text>Items: {JSON.stringify(order.items)}</Text>
          <Text>Total: {formatPrice(order.total)}</Text>
        </View>
      )}
    </View>
  );
};

export default AddOrders;
