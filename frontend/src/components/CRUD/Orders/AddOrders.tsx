import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import OrdersAPI from '@api/orders.api';

const AddOrders = () => {  
  /*
  ItemSChema 
  const [product, setProduct] = useState('');
  const [productModel, setProductModel] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [serviceDate, setServiceDate] = useState('');
*/
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState('');
  const [total, setTotal] = useState('');


  const [submitted, setSubmitted] = useState(false);
  const [Orders, setOrders] = useState({
    _id: '',
    customer: '',
    items: '',
    total: '',
  });

  const handleSubmit = async () => {
    OrdersAPI.create({
      customer,
      items,
      total,
     
    }).then((res) => setOrders(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add Orders</Text>

      <Text>Customer</Text>
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
      ></TextInput>

      {/*<Text>Items</Text>
      <Picker
        style={Layout.input}
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
      >
        <Picker.Item label="Mountain" value="Mountain"></Picker.Item>
        <Picker.Item label="Electric" value="Electric"></Picker.Item>
        <Picker.Item label="Street" value="Street"></Picker.Item>
      </Picker>

      <Text>Image {'(URL)'}</Text>
      <TextInput
        style={Layout.input}
        value={image}
        onChangeText={(value) => setImage(value)}
  ></TextInput>*/}

      <Button title="submit" onPress={handleSubmit} />

      {submitted && (
        <View>
          <Text>_id: {Orders._id}</Text>
          <Text>customer: {Orders.customer}</Text>
          <Text>Items: {Orders.items}</Text>
          <Text>Total: {Orders.total}</Text>
        </View>
      )}
    </View>
  );
};

export default AddOrders;
