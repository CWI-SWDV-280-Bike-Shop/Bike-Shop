import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Styles from '../../../Styles';
import BikeService from '../../../services/bike.service';

export const AddBike = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [bike, setBike] = useState({
    _id: '',
    name: '',
    description: '',
    category: '',
    color: '',
    size: '',
    gender: '',
    price: 0,
  });

  const handleSubmit = async () => {
    BikeService.create({
      name,
      description,
      category,
      color,
      size,
      gender,
      price,
    }).then((res) => setBike(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Styles.subsection}>
      <Text style={Styles.subtitle}>Add Bike</Text>

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
        <Picker.Item label="Mountain" value="Mountain"></Picker.Item>
        <Picker.Item label="Electric" value="Electric"></Picker.Item>
        <Picker.Item label="Street" value="Street"></Picker.Item>
      </Picker>

      <Text>Color</Text>
      <Picker
        style={Styles.input}
        selectedValue={color}
        onValueChange={(value) => setColor(value)}
      >
        <Picker.Item label="Red" value="Red"></Picker.Item>
        <Picker.Item label="Orange" value="Orange"></Picker.Item>
        <Picker.Item label="Yellow" value="Yellow"></Picker.Item>
        <Picker.Item label="Green" value="Green"></Picker.Item>
        <Picker.Item label="Blue" value="Blue"></Picker.Item>
        <Picker.Item label="Purple" value="Purple"></Picker.Item>
        <Picker.Item label="Black" value="Black"></Picker.Item>
        <Picker.Item label="White" value="White"></Picker.Item>
        <Picker.Item label="Grey" value="Grey"></Picker.Item>
      </Picker>

      <Text>Size</Text>
      <Picker
        style={Styles.input}
        selectedValue={size}
        onValueChange={(value) => setSize(value)}
      >
        <Picker.Item label="Small" value="Small"></Picker.Item>
        <Picker.Item label="Medium" value="Medium"></Picker.Item>
        <Picker.Item label="Large" value="Large"></Picker.Item>
      </Picker>

      <Text>Gender</Text>
      <TextInput
        style={Styles.input}
        value={gender}
        onChangeText={(value) => setGender(value)}
      ></TextInput>

      <Text>Price</Text>
      <TextInput
        style={Styles.input}
        value={price.toString()}
        onChangeText={(value) => setPrice(Number(value))}
      ></TextInput>

      <Button title="submit" onPress={handleSubmit} />

      {submitted && (
        <View>
          <Text>_id: {bike._id}</Text>
          <Text>name: {bike.name}</Text>
          <Text>description: {bike.description}</Text>
          <Text>category: {bike.category}</Text>
          <Text>color: {bike.color}</Text>
          <Text>size: {bike.size}</Text>
          <Text>gender: {bike.gender}</Text>
          <Text>price: {bike.price.toString()}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bike: {
    margin: 10,
  },
});
