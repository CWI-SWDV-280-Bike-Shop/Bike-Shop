import React from 'react';
import { View, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import AddBike from './Bikes/AddBike';
import ListBikes from './Bikes/ListBikes';

const Bikes = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Bikes</Text>
      <AddBike />
      <ListBikes />
    </View>
  );
};

export default Bikes;
