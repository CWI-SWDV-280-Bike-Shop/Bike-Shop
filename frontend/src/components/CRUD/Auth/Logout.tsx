import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Layout from '@styles/layout/Layout';
import { AuthContext } from '@context/auth.context';

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

export default Logout;
