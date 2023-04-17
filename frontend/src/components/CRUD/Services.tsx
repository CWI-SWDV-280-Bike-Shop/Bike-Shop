import React from 'react';
import { View, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import AddService from './Services/AddService';
import ListServices from './Services/ListServices';

const Services = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Service</Text>
      <AddService />
      <ListServices />
    </View>
  );
};

export default Services;
