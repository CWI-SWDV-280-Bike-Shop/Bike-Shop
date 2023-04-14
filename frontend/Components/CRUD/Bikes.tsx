import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import AddBike from './Bikes/AddBike';
import ListBikes from './Bikes/ListBikes';

const Bikes = () => {
  return (
    <View style={Styles.section}>
      <Text style={Styles.title}>Bikes</Text>
      <AddBike />
      <ListBikes />
    </View>
  );
};

export default Bikes;
