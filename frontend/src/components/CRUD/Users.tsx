import React from 'react';
import { View, Text } from 'react-native';
import Layout from '@styles/layout/Layout';
import AddUsers from './Users/AddUsers';
import ListUsers from './Users/ListUsers';

const Users = () => {
  return (
    <View style={Layout.section}>
      <Text style={Layout.title}>Users</Text>
      <AddUsers />
      <ListUsers />
    </View>
  );
};

export default Users;
