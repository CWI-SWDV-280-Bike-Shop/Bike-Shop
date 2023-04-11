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

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Redux Test Page" component={ReduxTestPage} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
