import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import ServiceAPI from '@api/service.api';
import { Service } from '@/types/data.types';
import { formatPrice } from '@/utilities/formatter';

const AddService = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [inStock, setInStock] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState({} as Service);

  const handleSubmit = async () => {
    const newService: Service = {
      name,
      description,
      category,
      price,
      image,
      inStock,
    };
    ServiceAPI.create(service).then((res) => setService(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add Service</Text>

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
          <Text>_id: {service?._id}</Text>
          <Text>name: {service?.name}</Text>
          <Text>description: {service.description}</Text>
          <Text>category: {service.category}</Text>
          <Text>price: {formatPrice(service.price)}</Text>
        </View>
      )}
    </View>
  );
};

const ListServices = () => {
  const [services, setServices] = useState([{}] as [Service]);

  useEffect(() => {
    ServiceAPI.getAll().then((res) => setServices(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Services</Text>
      {services &&
        services.map((service: Service) => (
          <View style={Layout.card} key={service?._id}>
            <Text>ID: {service?._id}</Text>
            <Text>Name: {service?.name}</Text>
            <Text>Description: {service?.description}</Text>
            <Text>Category: {service?.category}</Text>
            <Text>Price: {formatPrice(service?.price)}</Text>
            <Text>In Stock: {service?.inStock?.toString()}</Text>
          </View>
        ))}
    </View>
  );
};

const Services = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Services</Text>
      <AddService />
      <ListServices />
    </View>
  );
};

export default Services;
