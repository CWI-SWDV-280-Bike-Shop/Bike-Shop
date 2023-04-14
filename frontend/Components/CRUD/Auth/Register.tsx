import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Styles from '../../../Styles';
import AuthContext from '../../../context/auth.context';
import { Picker } from '@react-native-picker/picker';

const Register = () => {
  const { NewUser, isRegistered, register } = useContext(AuthContext);

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

  const [role, setRole] = useState('Customer'); //setting default role... this is kinda sloppy

  const onChangeAddress = (fieldName: string, value: string) => {
    setAddress({ ...address, [fieldName]: value });
  };

  const handleSubmit = () => {
    register({ name, email, password, phone, address, role });
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

      {isRegistered && (
        <View>
          <Text>name: {NewUser.name}</Text>
          <Text>email: {NewUser.email}</Text>
          <Text>phone: {NewUser.phone}</Text>
          <Text>address: {JSON.stringify(NewUser.address)}</Text>
          <Text>role: {NewUser.role}</Text>
        </View>
      )}
    </View>
  );
};

export default Register;
