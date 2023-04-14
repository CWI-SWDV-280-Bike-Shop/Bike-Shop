import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import { Login, Register } from './Auth/index';

export const Auth = () => {
  return (
    <View style={Styles.section}>
      <Text style={Styles.title}>Auth</Text>
      <Login />
      <Register />
    </View>
  );
};
