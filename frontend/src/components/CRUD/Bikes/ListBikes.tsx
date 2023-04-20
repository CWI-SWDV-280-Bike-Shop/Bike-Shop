import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import BikeAPI from '@api/bike.api';
import { formatPrice } from '@/utilities/formatter';

const ListBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    BikeAPI.getAll().then((res) => setBikes(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Bikes</Text>
      {bikes &&
        bikes.map((bike) => (
          <View style={Layout.card} key={bike?._id}>
            <Text>ID: {bike?._id}</Text>
            <Text>Name: {bike?.name}</Text>
            <Text>Description: {bike.description}</Text>
            <Text>Category: {bike.category}</Text>
            <Text>Color: {bike.color}</Text>
            <Text>Size: {bike.size}</Text>
            <Text>Gender: {bike.gender}</Text>
            <Text>Price: {formatPrice(bike.price)}</Text>
            <Text>In Stock: {bike.inStock.toString()}</Text>
          </View>
        ))}
    </View>
  );
};

export default ListBikes;
