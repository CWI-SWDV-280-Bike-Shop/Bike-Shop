import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import UserAPI from '@api/user.api';
import { User } from '@/types/data.types';

const ListUser = () => {
  const [users, setUser] = useState([{}] as [User]);

  useEffect(() => {
    UserAPI.getAll().then((res) => setUser(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Users</Text>
      {users &&
        users.map((user) => (
          <View style={Layout.card} key={user?._id}>
            <Text>ID: {user?._id}</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Role: {user?.role}</Text>
            <Text>Phone: {user?.phone}</Text>
            <Text>Address</Text>
            <Text> Street: {user?.address?.street}</Text>
            <Text> City: {user?.address?.city}</Text>
            <Text> State: {user?.address?.state}</Text>
            <Text> Zip: {user?.address?.zip}</Text>
            <Text> Country: {user?.address?.country}</Text>
          </View>
        ))}
    </View>
  );
};

export default ListUser;
