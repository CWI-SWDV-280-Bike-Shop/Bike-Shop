import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import UserAPI from '@api/user.api';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(''); 
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [orders, setOrders] = useState('');
  

  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    orders: '',
  });

  const handleSubmit = async () => {
    UserAPI.create({
      name,
      email,
      password,
      phone,
      address,
      role,
      orders,
    }).then((res) => setUser(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add User</Text>

      <Text>Name</Text>
      <TextInput
        style={Layout.input}
        value={name}
        onChangeText={(value) => setName(value)}
      ></TextInput>

      <Text>Email</Text>
      <TextInput
        style={Layout.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      ></TextInput>

      <Text>Password</Text>
      <TextInput
        style={Layout.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
      ></TextInput>
    </View>
  );
};

export default AddUser;
