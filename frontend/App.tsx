import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './pages/home';
import { Shop } from './pages/shop';
import { About } from './pages/about';
import 'react-native-gesture-handler';
import { DrawerHeaderProps, createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const Drawer = createDrawerNavigator();

//Navigation Header
//TODO move into components folder
const NavigationHeader = ({ navigation }: DrawerHeaderProps) => {
  return (
    <View style={styles.headerView} >
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerTouchable} onPress={navigation.openDrawer}>
          <Icon
            name="menu-outline"
            size={40}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerLogoParent}>
        <Image source={require('./Media/Branding/OfficialLogo-white.png')} style={styles.headerLogo} />
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerTouchable}>
          <Icon name="cart-outline"
            size={40}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
//Header Stylesheetr
//TODO move to components
const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row", backgroundColor: "#6A7B76"
  },
  headerIcons: {
    flexDirection: "column", justifyContent: "center"
  },
  headerLogoParent: {
    flexDirection: "row", flex: 1, justifyContent: 'center'
  },
  headerLogo: {
    width: 180, height: 120,
  },
  headerTouchable: {
    margin: 8
  }
})
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
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;