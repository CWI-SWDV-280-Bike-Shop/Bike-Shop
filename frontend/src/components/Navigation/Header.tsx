import { DrawerHeaderProps } from "@react-navigation/drawer";
import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet, Platform, ScaledSize } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Pressable, } from 'react-native-web-hover'

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
  const checkPage = (page) => { return (navigation.getState().routeNames[navigation.getState().index]==page) }
  const HoverButton = (props: {title: string, page: string}) => {
    return (
      <Pressable style={({ hovered }) => [styles.buttonRoot, hovered && styles.buttonHovered, 
        (checkPage(props.page)) ? styles.active : styles.inactive]}>
            <TouchableOpacity onPress={() => navigation.navigate(props.page)}>
              <Text style={styles.navText}>{props.title}</Text>
            </TouchableOpacity>
        </Pressable>
    )
  }
  return (
    <View style={styles.navBar}>
      { navigation.getState().routeNames.map((name, i) => <HoverButton key={i} title={name} page={name}/>) } 
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
    <View style={[(props.navigation.getState().routeNames[props.navigation.getState().index]!="Home") ? styles.headerView : styles.headerHomeView]} >
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
  buttonRoot: { },
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