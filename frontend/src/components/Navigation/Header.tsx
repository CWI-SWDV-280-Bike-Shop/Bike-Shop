import { DrawerHeaderProps } from "@react-navigation/drawer";
import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet, Platform, Dimensions, useWindowDimensions, ScaledSize } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const NavigationBar = (props: DrawerHeaderProps & {smallDesktop: boolean}) => {
  
  if ((Platform.OS === 'android' || Platform.OS === 'ios') 
   || props.smallDesktop
  ) {
    return (
      <HamburgerMenu {...props} />
    );
  } else if (Platform.OS === 'web') {
    return (
      <DesktopNavbar {...props} />
    );
  }
}

const DesktopNavbar = ({ navigation }: DrawerHeaderProps) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
        <Text style={styles.navText}>Shop</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.navText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ReduxTestPage")}>
        <Text style={styles.navText}>Redux Test Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const HamburgerMenu = ({ navigation }: DrawerHeaderProps) => {
  return (
    <View style={styles.headerIcons}>
      <TouchableOpacity style={styles.headerTouchable} onPress={navigation.openDrawer}>
        <Icon
          name="menu-outline"
          size={40}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
}

//Navigation Header
export const NavigationHeader = (dimensions: ScaledSize) => (props: DrawerHeaderProps) => {
  let smallDesktop = false;
  if(dimensions.width <= 1450){
    smallDesktop = true;
  }

  return (
    <View style={styles.headerView} >
      <NavigationBar {...props} smallDesktop={smallDesktop} />
      <View style={styles.headerLogoParent}>
        <Image source={require('../../assets/Branding/OfficialLogo-white.png')} style={styles.headerLogo} />
      </View>
      <View style={[styles.headerIcons, { justifyContent: 'flex-end' }]}>
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
const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    backgroundColor: "#6A7B76",
    paddingTop: 7,
    justifyContent: 'space-around'
  },
  headerIcons: {
    flex: 1,
    flexDirection: "row",
    padding: 32,
  },
  headerLogoParent: {
    alignSelf: 'center'
  },
  headerLogo: {
    width: 180, height: 120,
  },
  headerTouchable: {
    margin: 8
  },
  navBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    color: '#FFF',
    fontSize: 25,
    margin: 8,
    borderColor: "#FFF",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  }
})