import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Styles from '../../../Styles';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { login } from '../../../store/auth.slice';

export const Login = () => {
  // initialize component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // initialize redux store
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // declare input methods
  const onChangeEmail = (email: string) => {
    setEmail(email);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
  };

  const handleLogin = () => {
    dispatch(login({ email, password }));
    setLoggedIn(true);
  };

  return (
    <View style={Styles.subsection}>
      <Text style={Styles.subtitle}>Login</Text>

      <Text>Email</Text>
      <TextInput
        style={Styles.input}
        value={email}
        onChangeText={onChangeEmail}
      />

      <Text>Password</Text>
      <TextInput
        style={Styles.input}
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      <Button title="Submit" onPress={handleLogin}></Button>

      {loggedIn && (
        <View>
          <Text>id: {auth.id}</Text>
          <Text>name: {auth.name}</Text>
          <Text>email: {auth.email}</Text>
          <Text>role: {auth.role}</Text>
          <Text>accessToken: {auth.accessToken}</Text>
          <Text>refreshToken: {auth.refreshToken}</Text>
        </View>
      )}
    </View>
  );
};
