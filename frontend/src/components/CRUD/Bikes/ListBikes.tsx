import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import BikeService from '@api/bike.api';

const ListBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    BikeService.getAll().then((res) => setBikes(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Bikes</Text>
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

export default ListBikes;
