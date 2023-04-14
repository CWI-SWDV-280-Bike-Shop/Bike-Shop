import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import { AddBike, ListBikes } from './Bikes/';

export const Bikes = () => {
  return (
    <View style={Styles.section}>
      <Text style={Styles.title}>Bikes</Text>
      <AddBike />
      <ListBikes />
    </View>
  );
};
