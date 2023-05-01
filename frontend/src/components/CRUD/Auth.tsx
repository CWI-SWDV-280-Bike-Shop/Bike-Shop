import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import Layout from '@styles/layout/Layout';
import { Picker } from '@react-native-picker/picker';
import AuthAPI from '@api/auth.api';
import { AuthContext } from '@context/auth.context';
import { User } from '@/types/data.types';

const Login = () => {
  const { authUser, login, message } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login({ email, password });
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Login</Text>

      <Text>Email</Text>
      <TextInput
        style={Layout.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Text>Password</Text>
      <TextInput
        style={Layout.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />
      <Button title="Submit" onPress={handleSubmit}></Button>

      {message && <Text>{message}</Text>}

      {authUser && (
        <View>
          <Text>id: {authUser._id}</Text>
          <Text>name: {authUser?.name}</Text>
          <Text>email: {authUser?.email}</Text>
          <Text>role: {authUser?.role}</Text>
          <Text>accessToken: {authUser?.accessToken}</Text>
          <Text>refreshToken: {authUser.refreshToken}</Text>
        </View>
      )}
    </View>
  );
};

const Logout = () => {
  const { logout, message } = useContext(AuthContext);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Logout</Text>
      <Button title="logout" onPress={logout}></Button>
      {message && <Text>{message}</Text>}
    </View>
  );
};

const Register = () => {
  const { authUser, login, message } = useContext(AuthContext);

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

  const [role, setRole] = useState('Customer');

  const onChangeAddress = (fieldName: string, value: string) => {
    setAddress({ ...address, [fieldName]: value });
  };

  const handleSubmit = () => {
    const newUser: User = {
      name,
      email,
      password,
      phone,
      address,
      role,
    };
    // register user and then immediately login.
    AuthAPI.register(newUser).then(() => login({ email, password }));
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Register</Text>

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

      <Text>Password</Text>
      <TextInput
        style={Layout.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
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

      {message && <Text>{message}</Text>}

      {authUser && (
        <View>
          <Text>id: {authUser._id}</Text>
          <Text>name: {authUser?.name}</Text>
          <Text>email: {authUser?.email}</Text>
          <Text>role: {authUser?.role}</Text>
          <Text>accessToken: {authUser?.accessToken}</Text>
          <Text>refreshToken: {authUser.refreshToken}</Text>
        </View>
      )}
    </View>
  );
};

const Auth = () => {
  return (
    <ScrollView style={Layout.section}>
      <Text style={Layout.title}>Auth </Text>
      <Login />
      <Logout />
      <Register />
    </ScrollView>
  );
};

export default Auth;
