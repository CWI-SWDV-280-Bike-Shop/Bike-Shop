import * as React from 'react';
import { AuthProvider } from './src/context/auth.context';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/pages/home';
import { Shop } from './src/pages/shop';
import { Profile } from './src/pages/profile';
import CRUDPlayground from './src/pages/CRUDPlayground';
import 'react-native-gesture-handler';
import {
  DrawerHeaderProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationHeader } from './src/components/Navigation/Header';
import { Login } from './src/pages/login';
import { ProfileNavigator } from './src/pages/profileNavigator';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <AuthProvider>
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
          <Drawer.Screen name="Shop" component={Shop} />
          <Drawer.Screen name="Profile " component={ProfileNavigator} />
          <Drawer.Screen name="CRUD Playground" component={CRUDPlayground} />
          <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
