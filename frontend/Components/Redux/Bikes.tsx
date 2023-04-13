import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Styles from '../../Styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import {
  retrieveBikes,
  createBike,
  updateBike,
  deleteBike,
} from '../../store/bike.slice.js';

export const Bikes = () => {
  const bikes = useAppSelector((state) => [...state.bikes]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveBikes());
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
