import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import UserAPI from '@api/user.api';

const ListUser = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    UserAPI.getAll().then((res) => setUser(res.data));
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Bikes</Text>
      {users &&
        users.map((users) => (
          <View style={styles.bike} key={users._id}>
            <Text>ID: {users._id}</Text>
            <Text>Name: {users.name.toString()}</Text>
            <Text>Description: {users.email.toString()}</Text>
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

export default ListUser;
