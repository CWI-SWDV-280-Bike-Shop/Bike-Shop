import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import AccessoryAPI from '@api/accessory.api';

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
          <View style={styles.bike} key={accessories._id}>
            <Text>ID: {accessories._id}</Text>
            <Text>Name: {accessories.name.toString()}</Text>
            <Text>Description: {accessories.description.toString()}</Text>
            <Text>Category: {accessories.category.toString()}</Text>
            <Text>Price: {accessories.price.toString()}</Text>
            <Text>In Stock: {accessories.inStock.toString()}</Text>     
            <Text>Image: {accessories.image.toString()}</Text>
          </View>
          //IMage type diffrent then string
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bike: {
    margin: 10,
  },
});

export default ListAccessories;
