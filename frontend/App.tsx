import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  { Home }  from './pages/home';
import  { Shop }  from './pages/shop';
import  { About }  from './pages/about';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, Image } from 'react-native';


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
          headerStyle: {
            backgroundColor: "#6A7B76",
          },
          headerTintColor: "#FFFFFF",
          headerTitle: () => (
            <Image source={require('./Media/Branding/OfficialLogo-white.png')} style={{width: 60, height: 60, }} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{
              margin: 8
            }}
            >
              <Text style = {{
                color: "#FFFFFF",
                textDecorationLine: "underline"
              }}
              >
                Login
              </Text>
            </TouchableOpacity>
          )
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Shop" component={Shop} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;