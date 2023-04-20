import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import AccessoryAPI from '@api/accessory.api';
import { Accessory } from '@/types/data.types';
import { formatPrice } from '@/utilities/formatter';

const AddAccessory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [inStock, setInStock] = useState(true);

  const [submitted, setSubmitted] = useState(false);
  const [accessory, setAccessory] = useState({} as Accessory);

  const handleSubmit = async () => {
    const newAccessory: Accessory = {
      name,
      description,
      category,
      price,
      image,
      inStock,
    };
    AccessoryAPI.create(newAccessory).then((res) => setAccessory(res.data));
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

      <Text>In Stock?</Text>
      <Picker
        style={Layout.input}
        selectedValue={inStock}
        onValueChange={(value) => setInStock(value)}
      >
        <Picker.Item label="true" value={true} />
        <Picker.Item label="false" value={false} />
      </Picker>

      <Text>Image {'(URL)'}</Text>
      <Text>TODO: Image Upload</Text>

      <Button title="submit" onPress={handleSubmit} />

      {submitted && (
        <View>
          <Text>_id: {accessory?._id}</Text>
          <Text>name: {accessory?.name}</Text>
          <Text>description: {accessory?.description}</Text>
          <Text>category: {accessory?.category}</Text>
          <Text>price: {formatPrice(accessory?.price)}</Text>
        </View>
      )}
    </View>
  );
};

const ListAccessories = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    AccessoryAPI.getAll().then((res) => setAccessories(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Accessories</Text>
      {accessories &&
        accessories.map((accessories) => (
          <View style={Layout.card} key={accessories?._id}>
            <Text>ID: {accessories?._id}</Text>
            <Text>Name: {accessories?.name}</Text>
            <Text>Description: {accessories?.description}</Text>
            <Text>Category: {accessories?.category}</Text>
            <Text>Price: {formatPrice(accessories?.price)}</Text>
            <Text>In Stock: {accessories?.inStock?.toString()}</Text>
            <Text>Image: {accessories?.image}</Text>
          </View>
          //IMage type diffrent then string
        ))}
    </View>
  );
};

const Accessories = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Accessories</Text>
      <AddAccessory />
      <ListAccessories />
    </View>
  );
};

export default Accessories;
