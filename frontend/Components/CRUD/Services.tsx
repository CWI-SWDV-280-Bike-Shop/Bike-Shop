import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import AddService from './Services/AddService';
import ListServices from './Services/ListServices';

const Services = () => {
  return (
    <View style={Styles.section}>
      <Text style={Styles.title}>Service</Text>
      <AddService />
      <ListServices />
    </View>
  );
};

export default Services;
