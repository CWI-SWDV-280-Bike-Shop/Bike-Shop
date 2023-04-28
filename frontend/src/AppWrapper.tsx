import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '@pages/home';
import CRUDPlayground from '@pages/CRUDPlayground';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationHeader } from '@/components/Navigation/Header';
import { Login } from '@pages/login';
import { ProfileNavigator } from '@/pages/Profile/profileNavigator';
import { About } from './pages/about';
import { Dimensions, Platform, ScaledSize, useWindowDimensions } from 'react-native';
import { Shop } from './pages/Shop/shop';
import { AuthContext } from '@context/auth.context';
import Cart from './pages/Shop/cart';

const Drawer = createDrawerNavigator();

const AppWrapper = () => {
  const dimensions = useWindowDimensions();
  const { isLoggedIn, authUser } = useContext(AuthContext);
  const checkMobile = (dimensions: ScaledSize) => {
    return Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      dimensions.width <= 992
      ? true
      : false;
  };

  const screens = [
    {"name" : "Home", "component": (props) => <Home {...props} dimensions={dimensions} />},
    {"name" : "About", "component": (props) => <About {...props} dimensions={dimensions} />},
    {"name" : "Shop", "component": (props) => <Shop {...props} dimensions={dimensions} />},
    (isLoggedIn) ?
      {"name" : "Profile", "component": (props) => <ProfileNavigator {...props} dimensions={dimensions} />} :
      {"name" : "Login", "component": (props) => <Login {...props} dimensions={dimensions} />},
    {"name" : "CRUD Playground", "component": (props) => <CRUDPlayground {...props} dimensions={dimensions} />},
    {"name" : "Cart", "component": (props) => <Cart {...props} dimensions={dimensions} options={{ drawerItemStyle: { display: 'none' } }} />},
  ]

  return (
    <NavigationContainer linking={{ prefixes: [] }}>
      <Drawer.Navigator
        initialRouteName={(checkMobile(dimensions)) ? "Shop" : "Home"}
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
        {
          screens.map((item, i) => (
            <Drawer.Screen name={item.name} key={i}>
              { item.component }
            </Drawer.Screen>
          ))
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
