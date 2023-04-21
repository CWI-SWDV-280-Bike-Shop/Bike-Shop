import React from 'react';
import { ScrollView, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import Auth from '@components/CRUD/Auth';
import Products from '@/components/CRUD/Products';
import Orders from '@components/CRUD/Orders';
import User from '@components/CRUD/Users';

const CRUDPlayground = () => {
  return (
    <ScrollView style={Layout.container}>
      <Text style={Layout.title}>CRUD Playground</Text>
      <Auth />
      <Products />
      <Orders />
      <User />
    </ScrollView>
  );
};

export default CRUDPlayground;
