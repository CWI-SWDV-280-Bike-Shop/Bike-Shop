import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Layout from '@styles/layout/Layout';
import Auth from '@components/CRUD/Auth';
import Products from '@/components/CRUD/Products';
import Orders from '@components/CRUD/Orders';
import Users from '@components/CRUD/Users';
import { ScrollView } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const CRUDPlayground = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Auth" component={Auth} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Users" component={Users} />
    </Drawer.Navigator>
  );
};

export default CRUDPlayground;
