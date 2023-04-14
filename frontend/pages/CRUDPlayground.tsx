import React from 'react';
import { ScrollView, Text } from 'react-native';
import Styles from '../Styles';
import Auth from '../Components/CRUD/Auth';
import Bikes from '../Components/CRUD/Bikes';
import Services from '../Components/CRUD/Services';

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
