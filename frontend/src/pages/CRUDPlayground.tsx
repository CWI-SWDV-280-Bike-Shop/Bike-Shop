import React from 'react';
import { ScrollView, Text } from 'react-native';
import Styles from '../styles/Layout';
import Auth from '../components/CRUD/Auth';
import Bikes from '../components/CRUD/Bikes';
import Services from '../components/CRUD/Services';

const CRUDPlayground = () => {
  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>CRUD Playground</Text>
      <Auth />
      <Bikes />
      <Services />
    </ScrollView>
  );
};

export default CRUDPlayground;
