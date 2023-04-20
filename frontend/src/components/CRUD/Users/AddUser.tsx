import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import UserAPI from '@api/user.api';
import { User } from '@/types/data.types';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({});
  const [role, setRole] = useState('');
  const [orders, setOrders] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({} as User);

  const handleSubmit = async () => {
    UserAPI.create(user).then((res) => setUser(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add User</Text>
      <Text>TODO</Text>
      {/* <Text>Name</Text>
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
      ></TextInput>*/}
    </View>
  );
};

export default AddUser;
