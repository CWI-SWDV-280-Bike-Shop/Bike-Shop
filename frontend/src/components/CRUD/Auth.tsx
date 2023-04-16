import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../styles/Layout';
import Login from './Auth/Login';
import Register from './Auth/Register';

const Auth = () => {
  return (
    <View style={Styles.section}>
      <Text style={Styles.title}>Auth </Text>
      <Login />
      <Register />
    </View>
  );
};

export default Auth;
