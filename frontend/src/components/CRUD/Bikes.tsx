import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import BikeAPI from '@api/bike.api';
import { Bike } from '@/types/data.types';
import { formatPrice } from '@/utilities/formatter';

const AddBike = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Mountain'); //initializing these because Picker sends null if you don't click
  const [material, setMaterial] = useState('Aluminum');
  const [wheelSize, setWheelSize] = useState('20in');
  const [color, setColor] = useState('Red');
  const [size, setSize] = useState('Small');
  const [gender, setGender] = useState('Mens');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [inStock, setInStock] = useState(true);

  const [submitted, setSubmitted] = useState(false);
  const [bike, setBike] = useState({} as Bike);

  const handleSubmit = async () => {
    const newBike: Bike = {
      name,
      brand,
      description,
      category,
      material,
      wheelSize,
      color,
      size,
      gender,
      price,
      image,
    };
    BikeAPI.create(newBike).then((res) => setBike(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add Bike</Text>

      <Text>Name</Text>
      <TextInput
        style={Layout.input}
        value={name}
        onChangeText={(value) => setName(value)}
      ></TextInput>

      <Text>Brand</Text>
      <TextInput
        style={Layout.input}
        value={brand}
        onChangeText={(value) => setBrand(value)}
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
        <Picker.Item label="Mountain" value="Mountain"></Picker.Item>
        <Picker.Item label="Electric" value="Electric"></Picker.Item>
        <Picker.Item label="Street" value="Street"></Picker.Item>
      </Picker>

      <Text>Material</Text>
      <Picker
        style={Layout.input}
        selectedValue={material}
        onValueChange={(value) => setMaterial(value)}
      >
        <Picker.Item label="Aluminum" value="Aluminum"></Picker.Item>
        <Picker.Item label="Steel" value="Steel"></Picker.Item>
        <Picker.Item label="Carbon" value="Carbon"></Picker.Item>
      </Picker>

      <Text>Wheel Size</Text>
      <Picker
        style={Layout.input}
        selectedValue={wheelSize}
        onValueChange={(value) => setWheelSize(value)}
      >
        <Picker.Item label="20in" value="20in"></Picker.Item>
        <Picker.Item label="24in" value="24in"></Picker.Item>
        <Picker.Item label="26in" value="26in"></Picker.Item>
        <Picker.Item label="27.5in" value="27.5in"></Picker.Item>
        <Picker.Item label="29in" value="29in"></Picker.Item>
        <Picker.Item label="700c" value="700c"></Picker.Item>
        <Picker.Item label="650b" value="650b"></Picker.Item>
      </Picker>

      <Text>Color</Text>
      <Picker
        style={Layout.input}
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
        style={Layout.input}
        selectedValue={size}
        onValueChange={(value) => setSize(value)}
      >
        <Picker.Item label="Small" value="Small"></Picker.Item>
        <Picker.Item label="Medium" value="Medium"></Picker.Item>
        <Picker.Item label="Large" value="Large"></Picker.Item>
      </Picker>

      <Text>Gender</Text>
      <Picker
        style={Layout.input}
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
      >
        <Picker.Item label="Mens" value="Mens"></Picker.Item>
        <Picker.Item label="Womens" value="Womens"></Picker.Item>
        <Picker.Item label="Neutral" value="Neutral"></Picker.Item>
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
          <Text>id: {bike?._id}</Text>
          <Text>name: {bike?.name}</Text>
          <Text>description: {bike.description}</Text>
          <Text>category: {bike.category}</Text>
          <Text>color: {bike.color}</Text>
          <Text>size: {bike.size}</Text>
          <Text>gender: {bike.gender}</Text>
          <Text>price: {formatPrice(bike.price)}</Text>
        </View>
      )}
    </View>
  );
};

const ListBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    BikeAPI.getAll().then((res) => setBikes(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Bikes</Text>
      {bikes &&
        bikes.map((bike: Bike) => (
          <View style={Layout.card} key={bike?._id}>
            <Text>ID: {bike?._id}</Text>
            <Text>Name: {bike?.name}</Text>
            <Text>Description: {bike?.description}</Text>
            <Text>Category: {bike?.category}</Text>
            <Text>Color: {bike?.color}</Text>
            <Text>Size: {bike?.size}</Text>
            <Text>Gender: {bike?.gender}</Text>
            <Text>Price: {formatPrice(bike?.price)}</Text>
            <Text>In Stock: {bike?.inStock?.toString()}</Text>
          </View>
        ))}
    </View>
  );
};

const Bikes = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Bikes</Text>
      <AddBike />
      <ListBikes />
    </View>
  );
};

export default Bikes;
