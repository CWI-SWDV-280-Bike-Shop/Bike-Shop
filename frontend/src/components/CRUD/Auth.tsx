import React from 'react';
import { View, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Logout from './Auth/Logout'

const Auth = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Auth </Text>
      <Login />
      <Logout />
      <Register />
    </View>
  );
};

export default Auth;
