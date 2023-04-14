import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import { AddService, ListServices } from './Service/';

export const Service = () => {
  return (
    <View style={Styles.section}>
      <Text style={Styles.title}>Service</Text>
      <AddService />
      <ListServices />
    </View>
  );
};
