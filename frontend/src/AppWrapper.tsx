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
import { About } from './pages/about';
import { Dimensions, ScaledSize, useWindowDimensions } from 'react-native';
import { Shop } from './pages/Shop/shop';
import { AuthContext } from '@context/auth.context';
import Cart from './pages/Shop/cart';

const Drawer = createDrawerNavigator();

const AppWrapper = () => {
  const dimensions = useWindowDimensions();
  const { isLoggedIn } = useContext(AuthContext);

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
          header: (props) => <NavigationHeader {...props} />,
        }}
      >
        <Drawer.Screen name="Home">
          {(props) => <Home {...props} dimensions={dimensions} />}
        </Drawer.Screen>
        {/* <Drawer.Screen name="Bikes" component={Bikes} /> 
        <Drawer.Screen name="Accessories" component={Accessories} />
        <Drawer.Screen name="Services" component={Services} />*/}
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Shop" component={Shop} />
        {(isLoggedIn && (
          <Drawer.Screen name="Profile" component={ProfileNavigator} />
        )) || <Drawer.Screen name="Login" component={Login} />}
        {/* <Drawer.Screen name="Profile" component={ProfileNavigator} />
        <Drawer.Screen name="Login" component={Login} /> */}
        <Drawer.Screen name="CRUD Playground" component={CRUDPlayground} />
        <Drawer.Screen
          name="Cart"
          component={Cart}
          options={{ drawerItemStyle: { display: 'none' } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
