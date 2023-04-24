import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet, Platform, ScaledSize } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '@context/auth.context';
import { Pressable, } from 'react-native-web-hover'

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

  const nav = props.navigation;
  const { isLoggedIn } = useContext(AuthContext);

  const checkMobile = (dimensions: ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 992) ? true : false }
  const checkPage = (page) => { return (nav.getState().routeNames[nav.getState().index] == page) }
  const HoverButton = (props: { title: string, page: string }) => {
    return (
      <Pressable style={({ hovered }) => [styles.buttonRoot, hovered && styles.buttonHovered,
      (checkPage(props.page)) ? styles.active : styles.inactive]}>
        <TouchableOpacity onPress={() => nav.navigate(props.page)}>
          <Text style={styles.navText}>{props.title}</Text>
        </TouchableOpacity>
      </Pressable>
    )
  }

  const DesktopNavbar = ({ navigation }: DrawerHeaderProps) => {
    return (
      <View style={styles.navBar}>
        {navigation.getState().routeNames.map((name, i) => {
          if (name === 'Cart') {
            return;
          }
          if (isLoggedIn && name !== 'Login' || !isLoggedIn && name !== 'Profile') {
            return (<HoverButton key={i} title={name} page={name} />)
          }
        })
        }
      </View>
    );
  }

  const NavigationBar = (props: DrawerHeaderProps) => {
    return (checkMobile(dimensions)) ? <HamburgerMenu {...props} /> : <DesktopNavbar {...props} />
  }

  const currentRoute = nav.getState().routeNames[nav.getState().index];

  return (
    <View style={[(currentRoute != "Home" || checkMobile(dimensions)) ? styles.headerView : styles.headerHomeView]} >
      <NavigationBar {...props} />
      <View style={styles.headerLogoParent}>
        <Image source={require('../../assets/Branding/OfficialLogo-white.png')} style={styles.headerLogo} />
      </View>
      <View style={[styles.headerIcons, { justifyContent: 'flex-end' }]}>
        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={() => props.navigation.navigate('Cart')}
        >
          <Icon name="cart-outline"
            size={40}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

//Header Stylesheet
const styles = StyleSheet.create({
  active: {
    borderBottomColor: '#fff',
    borderBottomWidth: 5
  },
  inactive: {
    borderBottomColor: '#ffffff00',
    borderBottomWidth: 5
  },
  buttonRoot: {},
  buttonHovered: { backgroundColor: '#00000088' },
  headerHomeView: {
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: "#6A7B7600",
    flexDirection: "row",
    paddingTop: 7,
    justifyContent: 'space-around'
  },
  headerView: {
    backgroundColor: "#6A7B76",
    flexDirection: "row",
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
    marginHorizontal: 10
  },
  navText: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: "700",
    fontSize: 18,
    margin: 8,
    paddingHorizontal: 5,
  }
})