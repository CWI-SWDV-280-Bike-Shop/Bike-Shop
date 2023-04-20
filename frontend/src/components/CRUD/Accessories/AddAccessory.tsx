import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import AccessoryAPI from '@api/accessory.api';
import { formatPrice } from '@/utilities/formatter';
import { Accessory } from '@/types/data.types';

const AddAccessory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); //initializing these because Picker sends null if you don't click
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [accessory, setAccessory] = useState({} as Accessory);

  const handleSubmit = async () => {
    AccessoryAPI.create(accessory).then((res) => setAccessory(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add Accessory</Text>

      <Text>Name</Text>
      <TextInput
        style={Layout.input}
        value={name}
        onChangeText={(value) => setName(value)}
      ></TextInput>

      <Text>Description</Text>
      <TextInput
        style={Layout.input}
        value={description}
        onChangeText={(value) => setDescription(value)}
      ></TextInput>

      <Text>Category</Text>
      <Picker
        style={Layout.input}
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
      >
        <Picker.Item label="Tires" value="Tires"></Picker.Item>
        <Picker.Item label="Brakes" value="Brakes"></Picker.Item>
        <Picker.Item label="Lights" value="Lights"></Picker.Item>
        <Picker.Item label="Frames" value="Frames"></Picker.Item>
        <Picker.Item label="Chains" value="Chains"></Picker.Item>
        <Picker.Item label="Pedals" value="Pedals"></Picker.Item>
        <Picker.Item label="Tires" value="Tires"></Picker.Item>
        <Picker.Item label="Tubes" value="Tubes"></Picker.Item>
      </Picker>

      <Text>Price</Text>
      <TextInput
        style={Layout.input}
        value={price.toString()}
        onChangeText={(value) => setPrice(Number(value))}
      ></TextInput>

      <Text>Image {'(URL)'}</Text>
      <TextInput
        style={Layout.input}
        value={image}
        onChangeText={(value) => setImage(value)}
      ></TextInput>

      <Button title="submit" onPress={handleSubmit} />

      {submitted && (
        <View>
          <Text>_id: {accessory?._id}</Text>
          <Text>name: {accessory?.name}</Text>
          <Text>description: {accessory.description}</Text>
          <Text>category: {accessory.category}</Text>
          <Text>price: {formatPrice(accessory.price)}</Text>
        </View>
      )}
    </View>
  );
};

export default AddAccessory;
