import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './pages/home';
import { Shop } from './pages/shop';
import { Profile } from './pages/profile';
import 'react-native-gesture-handler';
import { DrawerHeaderProps, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationHeader } from './Components/Navigation/Header';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#6A7B76"
          },
          drawerActiveTintColor: "#FFFFFF",
          drawerActiveBackgroundColor: "#03312E",
          drawerInactiveTintColor: "#FFFFFF",
          headerTintColor: "#FFFFFF",
          header: NavigationHeader
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Shop" component={Shop} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;