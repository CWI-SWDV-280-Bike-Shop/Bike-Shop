import React from 'react';
import { View, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import AddAccessories from './Accessories/AddAccessories';
import ListAccessories from './Accessories/ListAccessories';

const Accessories = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Accessories</Text>
      <AddAccessories />
      <ListAccessories />
    </View>
  );
};

export default Accessories;
