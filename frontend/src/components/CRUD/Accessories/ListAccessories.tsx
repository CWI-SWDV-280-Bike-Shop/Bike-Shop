import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import AccessoryAPI from '@api/accessory.api';
import { formatPrice } from '@/utilities/formatter';

const ListAccessories = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    AccessoryAPI.getAll().then((res) => setAccessories(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Accessories</Text>
      {accessories &&
        accessories.map((accessories) => (
          <View style={Layout.card} key={accessories?._id}>
            <Text>ID: {accessories?._id}</Text>
            <Text>Name: {accessories?.name}</Text>
            <Text>Description: {accessories.description}</Text>
            <Text>Category: {accessories.category}</Text>
            <Text>Price: {formatPrice(accessories.price)}</Text>
            <Text>In Stock: {accessories.inStock.toString()}</Text>
            <Text>Image: {accessories.image}</Text>
          </View>
          //IMage type diffrent then string
        ))}
    </View>
  );
};

export default ListAccessories;
