import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Styles from '../../../Styles';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { register } from '../../../store/auth.slice';

export const Register = () => {
  // initialize component state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [role, setRole] = useState('Customer'); //setting default role... this is sloppy
  const [registered, setRegistered] = useState(false);

  // initialize redux store
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onChangeAddress = (fieldName: string, value: string) => {
    setAddress({ ...address, [fieldName]: value });
  };

  const handleSubmit = () => {
    dispatch(register({ name, email, password, phone, address, role }));
    setRegistered(true);
  };

  return (
    <View style={Styles.subsection}>
      <Text style={Styles.subtitle}>Register</Text>

      <Text>Name</Text>
      <TextInput
        style={Styles.input}
        value={name}
        onChangeText={(value) => setName(value)}
      />

      <Text>Email</Text>
      <TextInput
        style={Styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Text>Password</Text>
      <TextInput
        style={Styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />

      <Text>Phone</Text>
      <TextInput
        style={Styles.input}
        value={phone}
        onChangeText={(value) => setPhone(value)}
      />

      <Text>Address</Text>
      <Text>Street</Text>
      <TextInput
        style={Styles.input}
        value={address.street}
        onChangeText={(value) => onChangeAddress('street', value)}
      />
      <Text>City</Text>
      <TextInput
        style={Styles.input}
        value={address.city}
        onChangeText={(value) => onChangeAddress('city', value)}
      />
      <Text>State</Text>
      <TextInput
        style={Styles.input}
        value={address.state}
        onChangeText={(value) => onChangeAddress('state', value)}
      />
      <Text>Zip</Text>
      <TextInput
        style={Styles.input}
        value={address.zip}
        onChangeText={(value) => onChangeAddress('zip', value)}
      />
      <Text>Country</Text>
      <TextInput
        style={Styles.input}
        value={address.country}
        onChangeText={(value) => onChangeAddress('country', value)}
      />

      <Text>Role</Text>
      <Picker
        style={Styles.input}
        selectedValue={role}
        onValueChange={(value) => setRole(value)}
      >
        <Picker.Item label="Customer" value="Customer"></Picker.Item>
        <Picker.Item label="Admin" value="Admin"></Picker.Item>
      </Picker>

      <Button title="Submit" onPress={handleSubmit}></Button>

      {registered && (
        <View>
          <Text>id: {auth.id}</Text>
          <Text>name: {auth.name}</Text>
          <Text>email: {auth.email}</Text>
          <Text>phone: {auth.phone}</Text>
          <Text>address: {JSON.stringify(auth.address)}</Text>
          <Text>role: {auth.role}</Text>
          <Text>accessToken: {auth.accessToken}</Text>
          <Text>refreshToken: {auth.refreshToken}</Text>
        </View>
      )}
    </View>
  );
};
