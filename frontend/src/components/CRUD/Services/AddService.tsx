import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Styles from '../../../styles/Layout';
import ServiceService from '../../../api/service.api';

const AddService = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState({
    _id: '',
    name: '',
    description: '',
    category: '',
    price: 0,
  });

  const handleSubmit = async () => {
    ServiceService.create({
      name,
      description,
      category,
      price,
    }).then((res) => setService(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Styles.subsection}>
      <Text style={Styles.subtitle}>Add Service</Text>

      <Text>Name</Text>
      <TextInput
        style={Styles.input}
        value={name}
        onChangeText={(value) => setName(value)}
      ></TextInput>

      <Text>Description</Text>
      <TextInput
        style={Styles.input}
        value={description}
        onChangeText={(value) => setDescription(value)}
      ></TextInput>

      <Text>Category</Text>
      <Picker
        style={Styles.input}
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
      >
        <Picker.Item label="Tune" value="Tune"></Picker.Item>
        <Picker.Item
          label="Wheel and Tire Maintenance"
          value="Wheel and Tire Maintenance"
        ></Picker.Item>
        <Picker.Item label="Assembly" value="Assembly"></Picker.Item>
        <Picker.Item
          label="Shifting and Brakes"
          value="Shifting and Brakes"
        ></Picker.Item>
      </Picker>

      <Text>Price</Text>
      <TextInput
        style={Styles.input}
        value={price.toString()}
        onChangeText={(value) => setPrice(Number(value))}
      ></TextInput>

      <Button title="submit" onPress={handleSubmit} />

      {submitted && (
        <View>
          <Text>_id: {service._id}</Text>
          <Text>name: {service.name}</Text>
          <Text>description: {service.description}</Text>
          <Text>category: {service.category}</Text>
          <Text>price: {service.price.toString()}</Text>
        </View>
      )}
    </View>
  );
};

export default AddService;
