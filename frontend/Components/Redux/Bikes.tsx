import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Styles from '../../Styles';
import BikeService from '../../services/bike.service';

export const Bikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    BikeService.getAll().then((res) => setBikes(res.data));
  }, []);

  return (
    <View style={Styles.section}>
      <Text style={Styles.title}>Bikes</Text>
      {bikes &&
        bikes.map((bike) => (
          <View style={styles.bike} key={bike._id}>
            <Text>ID: {bike._id}</Text>
            <Text>Name: {bike.name.toString()}</Text>
            <Text>Description: {bike.description.toString()}</Text>
            <Text>Category: {bike.category.toString()}</Text>
            <Text>Color: {bike.color.toString()}</Text>
            <Text>Size: {bike.size.toString()}</Text>
            <Text>Gender: {bike.gender.toString()}</Text>
            <Text>Price: {bike.price.toString()}</Text>
            <Text>In Stock: {bike.inStock.toString()}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bike: {
    margin: 10,
  },
});
