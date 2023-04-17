import React, { useContext } from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@pages/home';
import CRUDPlayground from '@pages/CRUDPlayground';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationHeader } from '@/components/Navigation/Header';
import { Login } from '@pages/login';
import { ProfileNavigator } from '@/pages/Profile/profileNavigator';
import Bikes from '@pages/Shop/Products/bikes';
import Accessories from '@pages/Shop/Products/accessories';
import Services from '@pages/Shop/Products/services';

const Drawer = createDrawerNavigator();

const AppWrapper = () => {
  return (
    <NavigationContainer linking={{ prefixes: [] }}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#6A7B76',
          },
          drawerActiveTintColor: '#FFFFFF',
          drawerActiveBackgroundColor: '#03312E',
          drawerInactiveTintColor: '#FFFFFF',
          headerTintColor: '#FFFFFF',
          header: NavigationHeader,
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Bikes" component={Bikes} />
        <Drawer.Screen name="Accessories" component={Accessories} />
        <Drawer.Screen name="Services" component={Services} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Profile " component={ProfileNavigator} />
        <Drawer.Screen name="CRUD Playground" component={CRUDPlayground} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
