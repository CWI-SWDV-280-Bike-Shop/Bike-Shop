import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import UserAPI from '@api/user.api';
import { User } from '@/types/data.types';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [role, setRole] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({} as User);

  const onChangeAddress = (fieldName: string, value: string) => {
    setAddress({ ...address, [fieldName]: value });
  };

  const handleSubmit = async () => {
    const newUser: User = {
      name,
      email,
      phone,
      address,
      role,
    };
    UserAPI.create(newUser).then((res) => setUser(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add User</Text>

      <Text>
        TODO: Imagine you're an admin, manually adding a user. We DO NOT want
        the admin setting the password for the user, this should be done through
        an email service to "Set up your Login" or something. However, being
        that we're short on time, we may just have to allow the admin to set the
        password, and then hijack the Auth route for registering the user.
      </Text>

      <Text>Name</Text>
      <TextInput
        style={Layout.input}
        value={name}
        onChangeText={(value) => setName(value)}
      />

      <Text>Email</Text>
      <TextInput
        style={Layout.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Text>Phone</Text>
      <TextInput
        style={Layout.input}
        value={phone}
        onChangeText={(value) => setPhone(value)}
      />

      <Text>Address</Text>
      <Text>Street</Text>
      <TextInput
        style={Layout.input}
        value={address.street}
        onChangeText={(value) => onChangeAddress('street', value)}
      />
      <Text>City</Text>
      <TextInput
        style={Layout.input}
        value={address.city}
        onChangeText={(value) => onChangeAddress('city', value)}
      />
      <Text>State</Text>
      <TextInput
        style={Layout.input}
        value={address.state}
        onChangeText={(value) => onChangeAddress('state', value)}
      />
      <Text>Zip</Text>
      <TextInput
        style={Layout.input}
        value={address.zip}
        onChangeText={(value) => onChangeAddress('zip', value)}
      />
      <Text>Country</Text>
      <TextInput
        style={Layout.input}
        value={address.country}
        onChangeText={(value) => onChangeAddress('country', value)}
      />

      <Text>Role</Text>
      <Picker
        style={Layout.input}
        selectedValue={role}
        onValueChange={(value) => setRole(value)}
      >
        <Picker.Item label="Customer" value="Customer"></Picker.Item>
        <Picker.Item label="Admin" value="Admin"></Picker.Item>
      </Picker>

      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
};

const ListUsers = () => {
  const [users, setUser] = useState([{}] as [User]);

  useEffect(() => {
    UserAPI.getAll().then((res) => setUser(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Users</Text>
      {users &&
        users.map((user) => (
          <View style={Layout.card} key={user?._id}>
            <Text>ID: {user?._id}</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Role: {user?.role}</Text>
            <Text>Phone: {user?.phone}</Text>
            <Text>Address</Text>
            <Text> Street: {user?.address?.street}</Text>
            <Text> City: {user?.address?.city}</Text>
            <Text> State: {user?.address?.state}</Text>
            <Text> Zip: {user?.address?.zip}</Text>
            <Text> Country: {user?.address?.country}</Text>
          </View>
        ))}
    </View>
  );
};

const Users = () => {
  return (
    <ScrollView style={Layout.section}>
      <Text style={Layout.title}>Users</Text>
      <AddUser />

      <ListUsers />
    </ScrollView>
  );
};

export default Users;
