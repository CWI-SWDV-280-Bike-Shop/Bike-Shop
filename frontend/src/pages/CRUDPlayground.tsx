import React from 'react';
import { ScrollView, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import Auth from '@components/CRUD/Auth';
import Bikes from '@components/CRUD/Bikes';
import Services from '@components/CRUD/Services';

const CRUDPlayground = () => {
  return (
    <ScrollView style={Layout.container}>
      <Text style={Layout.title}>CRUD Playground</Text>
      <Auth />
      <Bikes />
      <Services />
    </ScrollView>
  );
};

export default CRUDPlayground;
