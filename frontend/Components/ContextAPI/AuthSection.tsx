import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import { AuthProvider } from '../../context/auth.context';
import { Login } from './Auth';

export const AuthSection = () => {
  return (
    <AuthProvider>
      <View style={Styles.section}>
        <Text style={Styles.title}>Auth {'Context API'}</Text>
        <Login />
      </View>
    </AuthProvider>
  );
};
