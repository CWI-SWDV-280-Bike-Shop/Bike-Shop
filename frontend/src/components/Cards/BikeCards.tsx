import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import BikeAPI from '@api/bike.api';
import { ItemCard } from '../Cards/ItemCards';

const ListBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    BikeAPI.getAll().then((res) => setBikes(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      {bikes &&
        bikes.map((bike) => (
          <View style={styles.bike} key={bike._id}>
            {/* <Text>ID: {bike._id}</Text>
            <Text>Description: {bike.description.toString()}</Text>
            <Text>Category: {bike.category.toString()}</Text>
            <Text>Gender: {bike.gender.toString()}</Text> */}

            <ItemCard
              name={bike.name.toString()}
              price={bike.price.toString()}
              imgSrc={require('../../../assets/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={bike.inStock.toString()}
              color={bike.color.toString()}
              size={bike.size.toString()}
            />
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
