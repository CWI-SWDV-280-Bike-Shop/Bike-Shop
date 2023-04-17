import React from 'react';
import { View, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import Login from './Auth/Login';
import Register from './Auth/Register';

const Auth = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Auth </Text>
      <Login />
      <Register />
    </View>
  );
};

export default Auth;
