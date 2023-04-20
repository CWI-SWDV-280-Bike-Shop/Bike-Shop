import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import ServiceAPI from '@api/service.api';
import { formatPrice } from '@/utilities/formatter';

const ListServices = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    ServiceAPI.getAll().then((res) => setService(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Services</Text>
      {service &&
        service.map((service) => (
          <View style={styles.service} key={service?._id}>
            <Text>ID: {service?._id}</Text>
            <Text>Name: {service?.name}</Text>
            <Text>Description: {service.description}</Text>
            <Text>Category: {service.category}</Text>
            <Text>Price: {formatPrice(service.price)}</Text>
            <Text>In Stock: {service.inStock.toString()}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  service: {
    margin: 10,
  },
});

export default ListServices;
