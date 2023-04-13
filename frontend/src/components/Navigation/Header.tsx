import { DrawerHeaderProps } from "@react-navigation/drawer";
import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const NavigationBar = ({navigation}: DrawerHeaderProps) => {

  if ( (Platform.OS === 'android' || Platform.OS === 'ios') || Dimensions.get('window').width < 1450) {
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
  } else if (Platform.OS === 'web') {
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

}

//Navigation Header
export const NavigationHeader = (props: DrawerHeaderProps) => {
  return (
    <View style={styles.headerView} >
      <NavigationBar {...props} />
      <View style={styles.headerLogoParent}>
        <Image source={require('../../assets/Media/Branding/OfficialLogo-white.png')} style={styles.headerLogo} />
      </View>
      <View style={[styles.headerIcons, {justifyContent: 'flex-end'}]}>
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
    padding: '2rem'
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