import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Styles from '../../../Styles';
import ServicesService from '../../../services/service.service';

const ListServices = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    ServicesService.getAll().then((res) => setService(res.data));
  }, []);

  return (
    <View style={Styles.subsection}>
      <Text style={Styles.subtitle}>List Services</Text>
      {service &&
        service.map((service) => (
          <View style={styles.service} key={service._id}>
            <Text>ID: {service._id}</Text>
            <Text>Name: {service.name.toString()}</Text>
            <Text>Description: {service.description.toString()}</Text>
            <Text>Category: {service.category.toString()}</Text>
            <Text>Price: {service.price.toString()}</Text>
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
