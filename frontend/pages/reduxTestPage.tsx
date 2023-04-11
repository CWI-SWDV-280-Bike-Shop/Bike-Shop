import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { retrieveBikes } from '../store/bikeSlice';
import { View, Text, StyleSheet } from 'react-native';
import Styles from '../Styles';

export const ReduxTestPage = () => {
  const bikes = useAppSelector((state) => [...state.bikes]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveBikes());
    console.log(bikes);
  }, []);

  return (
    <View style={Styles.container}>
      <Text>Redux Test Page</Text>
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
