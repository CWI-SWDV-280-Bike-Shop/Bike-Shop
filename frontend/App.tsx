import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './pages/home';
import { Shop } from './pages/shop';
import { Profile } from './pages/profile';
import { ReduxTestPage } from './pages/reduxTestPage';
import 'react-native-gesture-handler';
import {
  DrawerHeaderProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationHeader } from './Components/Navigation/Header';
import { Login } from './pages/login';
import { ProfileNavigator } from './pages/profileNavigator';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer linking={{prefixes: []}}>
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
          <Drawer.Screen name="Redux Test Page" component={ReduxTestPage} />
          <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
