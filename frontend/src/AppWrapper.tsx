/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useContext } from 'react';
import {
  LinkingOptions,
  NavigationContainer,
  ParamListBase,
} from '@react-navigation/native';
import { Home } from '@pages/home';
import CRUDPlayground from '@pages/CRUDPlayground';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationHeader } from '@/components/Navigation/Header';
import { About } from './pages/about';
import { Profile } from './pages/Profile/profile';
import { Orders } from './pages/Profile/orders';
import { Account } from './pages/Profile/account';
import { Admin } from './pages/Profile/Admin/admin';
import { Platform, ScaledSize, useWindowDimensions } from 'react-native';
import { Shop } from './pages/Shop/shop';
import { AuthContext } from '@context/auth.context';
import Cart from './pages/Shop/cart';
import Checkout from '@pages/Shop/checkout';
import * as Linking from 'expo-linking';

const Drawer = createDrawerNavigator();

const AppWrapper = () => {
  const dimensions = useWindowDimensions();

  const screens = [
    {
      name: 'Home',
      component: (props) => <Home {...props} dimensions={dimensions} />,
    },
    {
      name: 'About',
      component: (props) => <About {...props} dimensions={dimensions} />,
    },
    {
      name: 'Shop',
      component: (props) => <Shop {...props} dimensions={dimensions} />,
    },
    {
      name: 'Profile',
      component: (props) => <Profile {...props} dimensions={dimensions} />,
    },
    {
      name: 'Login',
      component: (props) => <Profile {...props} dimensions={dimensions} />,
    },
    {
      name: 'Orders',
      component: (props) => <Orders {...props} dimensions={dimensions} />,
    },
    {
      name: 'Account',
      component: (props) => <Account {...props} dimensions={dimensions} />,
    },
    {
      name: 'Admin',
      component: (props) => <Admin {...props} dimensions={dimensions} />,
    },
    {
      name: 'CRUD Playground',
      component: (props) => (
        <CRUDPlayground {...props} dimensions={dimensions} />
      ),
    },
    {
      name: 'Cart',
      component: (props) => <Cart {...props} dimensions={dimensions} />,
    },
    {
      name: 'Checkout',
      component: (props) => <Checkout {...props} dimensions={dimensions} />,
    },
  ];

  const prefix = Linking.createURL('/');

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: '/',
        About: 'About',
        Shop: 'Shop',
        Profile: 'Profile',
        Options: 'Options',
        Orders: 'Orders',
        Account: 'Account',
        Admin: 'Admin',
        CRUDPlayground: 'CRUDPlayground',
        Cart: 'Cart',
        Checkout: 'Checkout',
      },
    },
  } as LinkingOptions<ParamListBase>;

  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator
        /* initialRouteName={(checkMobile(dimensions)) ? "Shop" : "Home"} */
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#6A7B76',
          },
          drawerActiveTintColor: '#FFFFFF',
          drawerActiveBackgroundColor: '#03312E',
          drawerInactiveTintColor: '#FFFFFF',
          headerTintColor: '#FFFFFF',
          header: (props) => <NavigationHeader {...props} />,
        }}
      >
        {screens.map((item, i) => {
          return ['Cart', 'Checkout', 'Orders', 'Account', 'Admin'].some(
            (name) => name === item.name
          ) ? (
            <Drawer.Screen
              name={item.name}
              key={i}
              options={{ drawerItemStyle: { display: 'none' } }}
            >
              {item.component}
            </Drawer.Screen>
          ) : (
            <Drawer.Screen name={item.name} key={i}>
              {item.component}
            </Drawer.Screen>
          );
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
