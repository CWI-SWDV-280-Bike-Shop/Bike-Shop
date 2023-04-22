import React, { useEffect, useState } from 'react';
import {  Text, StyleSheet, View, FlatList } from 'react-native';
import Layout from '@styles/layout/Layout';
import UserAPI from '@api/user.api';
import { User } from '@/types/data.types';
import { Product } from '@/types/data.types';
import ProductAPI from '@/api/product.api';
import { formatPrice } from '@/utilities/formatter';


const TableHeader = ({labels} : {labels: string[]}) => {
    return (
      <View style={[styles.row, styles.rowHeader]}>
        { labels.map((label) => (<View style={styles.col}><Text style={styles.rowHeaderText}>{label}</Text></View>)) }
    </View>
    )
}

const UserElement = ({user}: {user: User}) => (
  <View style={styles.row}>
    <View style={styles.col}><Text>{user?._id}</Text></View>
    <View style={styles.col}><Text>{user?.name}</Text></View>
    <View style={styles.col}><Text>{user?.email}</Text></View>
    <View style={styles.col}><Text>{user?.role}</Text></View>
    <View style={styles.col}><Text>{user?.phone}</Text></View>
    <View style={styles.col}><Text>0</Text></View>
    <View style={styles.col}><Text>{user?.address?.street}</Text></View>
    <View style={styles.col}><Text>{user?.address?.city}</Text></View>
    <View style={styles.col}><Text>{user?.address?.state}</Text></View>
    <View style={styles.col}><Text>{user?.address?.zip}</Text></View>
    <View style={styles.col}><Text>{user?.address?.country}</Text></View>
  </View>
);

const ListUsers = () => {
  const [users, setUser] = useState([{}] as [User]);

  useEffect(() => {
    UserAPI.getAll().then((res) => setUser(res.data));
  }, []);

  return (
    <View style={styles.section}>
      { users &&
      <FlatList
        data={users}
        renderItem={({item}) => <UserElement user={item} />}
        keyExtractor={(user: User) => user?._id}
        ListHeaderComponent={() => <TableHeader labels={["id", "name", "email", "role", "phone", "orders", "street", "city", "state", "zip", "country"]}/>}
      />
      }
    </View>
  );
};

export const Admin = () => {
    return (
      <View style={[styles.container]}>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.header]}>Admin</Text>
          <Text style={[styles.bodyText]}>
            This is the admin page.
          </Text>
          <ListUsers />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  rowHeader: {
    borderBottomColor: '#f0f1f1',
    borderBottomWidth: 3,
    textTransform: 'uppercase'
  },
  rowHeaderText: {
    fontWeight: '700'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  col: {
    flex: 1,
    paddingHorizontal: '.5rem',
    paddingVertical: '.25rem'
  },
  section: {
    borderTopColor: '#6a7b76',
    borderTopWidth: 10,
    margin: '2rem',
    padding: '1rem',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1
  },
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  header: {
    margin: 20,
    fontSize: 48,
    color: "#262626"
  },
  bodyText: {
    marginHorizontal: 20,
    fontSize: 24,
    color: "#262626"
  },
});
