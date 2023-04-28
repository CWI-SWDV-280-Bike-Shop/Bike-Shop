import { DrawerHeaderProps } from '@react-navigation/drawer';
import React, { useContext, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Platform,
  ScaledSize,
  useWindowDimensions,
} from 'react-native';
import { colors } from '@/styles/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '@context/auth.context';
import { Pressable } from 'react-native-web-hover';
import { ShopContext } from '@/context/shop.context';
import Popover from "react-native-popover-view";

const HamburgerMenu = ({ navigation }: DrawerHeaderProps) => {
  return (
    <View style={styles.headerIcons}>
      <TouchableOpacity
        style={styles.headerTouchable}
        onPress={navigation.openDrawer}
      >
        <Icon name="menu-outline" size={40} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

//Navigation Header
export const NavigationHeader = (props: DrawerHeaderProps) => {
  const dimensions = useWindowDimensions();
  const nav = props.navigation;
  const { isLoggedIn } = useContext(AuthContext);

  const checkMobile = (dimensions: ScaledSize) => {
    return Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      dimensions.width <= 992
      ? true
      : false;
  };
  const checkPage = (page) => {
    return nav.getState().routeNames[nav.getState().index] == page;
  };
  const HoverButton = (props: { title: string; page: string }) => {
    return (
      <Pressable
        style={({ hovered }) => [
          styles.buttonRoot,
          hovered && styles.buttonHovered,
          checkPage(props.page) ? styles.active : styles.inactive,
        ]}
      >
        <TouchableOpacity onPress={() => nav.navigate(props.page)}>
          <Text style={styles.navText}>{props.title}</Text>
        </TouchableOpacity>
      </Pressable>
    );
  };

  const DesktopNavbar = ({ navigation }: DrawerHeaderProps) => {
    return (
      <View style={styles.navBar}>
        {navigation.getState().routeNames.map((name, i) => {
          if (name === 'Cart' || name === 'Profile') {
            return;
          }
          if (
            (isLoggedIn && name !== 'Login') ||
            (!isLoggedIn && name !== 'Profile')
          ) {
            return <HoverButton key={i} title={name} page={name} />;
          }
        })}
      </View>
    );
  };

  const NavigationBar = (props: DrawerHeaderProps) => {
    return checkMobile(dimensions) ? (
      <HamburgerMenu {...props} />
    ) : (
      <DesktopNavbar {...props} />
    );
  };

  const currentRoute = nav.getState().routeNames[nav.getState().index];
  const [showPopover, setShowPopover] = useState(false);
  return (
    <View
      style={[
        currentRoute != 'Home' || checkMobile(dimensions)
          ? styles.headerView
          : styles.headerHomeView,
      ]}
    >
      <NavigationBar {...props} />
      <View style={styles.headerLogoParent}>
        <Image
          source={require('../../assets/Branding/OfficialLogo-white.png')}
          style={styles.headerLogo}
        />
      </View>
      <View style={[styles.headerIcons, { justifyContent: 'flex-end' }]}>
      <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          popoverStyle={{ backgroundColor: '#ffffff00' }}
          backgroundStyle={{ backgroundColor: "transparent" }}
          from={
            <TouchableOpacity 
            style={[styles.headerTouchable, (checkMobile(dimensions) ? {display: 'none'} : {})]}
            onPress={() => setShowPopover(!showPopover)}>
              <ProfileButton />
            </TouchableOpacity>
          }
        >
          <ProfilePopup setShowPopover={setShowPopover} navigation={props.navigation}/>
        </Popover>
        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={() => props.navigation.navigate('Cart')}
        >
          <CartButton />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfilePopup = ({navigation, setShowPopover}) => {
  const { isLoggedIn, authUser, logout } = useContext(AuthContext);
  const username = isLoggedIn && authUser.name;
  const email = isLoggedIn && authUser.email;

  return (isLoggedIn) ? (
    <View style={styles.popoverBody}>
      <View style={styles.profileRow}>
        <View style={styles.profileImage}><Icon name="person-circle-outline" size={100} color="#FFF" /></View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => {
            setShowPopover(false);
            navigation.navigate('Profile', { screen: 'Account' });
          }}
        >
          <Text style={styles.btnFont}>Edit Profile</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileLinks}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowPopover(false);
            navigation.navigate('Profile', { screen: 'Orders' })
        }}
        >
          <View style={styles.iconlabelGrouping}>
            <Icon name="receipt-outline" size={24} color="#333333ee" />
            <Text style={styles.buttonContent}>Orders</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#333333ee"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowPopover(false);
            navigation.navigate('Profile', { screen: 'Admin' })
        }}
        >
          <View style={styles.iconlabelGrouping}>
            <Icon name="key-outline" size={24} color="#333333ee" />
            <Text style={styles.buttonContent}>Admin</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#333333ee"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          setShowPopover(false);
          logout();
        }}>
          <View style={styles.iconlabelGrouping}>
            <Icon name="log-out-outline" size={24} color="#333333ee" />
            <Text style={styles.buttonContent}>Logout</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#333333ee"/>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    //Login Screen
    //Needs to pull responsive login component from login
    <View style={styles.popoverBody}>
      <View style={styles.profileRow}>
        <View style={styles.profileDetails}>
        <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => {
              setShowPopover(false);
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.btnFont}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => {
              setShowPopover(false);
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.btnFont}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const ProfileButton = () => {
  return (
    <View style={styles.cartContainer}>
      <Icon name="person-outline" size={40} color="#FFF" />
    </View>
  );
};

const CartButton = () => {
  const { quantity } = useContext(ShopContext);
  return (
    <View style={styles.cartContainer}>
      <Icon name="cart-outline" size={40} color="#FFF" />
      {quantity > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartCount}>{quantity}</Text>
        </View>
      )}
    </View>
  );
};

//Header Stylesheet
const styles = StyleSheet.create({
  /* Popover Profile Stuff */
  popoverBody: {
    backgroundColor: '#ffffffdd',
    borderRadius: 25,
    borderColor: '#477B6133',
    borderWidth: 5,
    padding: 10,
    paddingVertical: 20,
  },
  popoverText: {
    color: '#fff'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#444',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  profileLinks: {
    paddingVertical: 20,
    marginHorizontal: 40,
    flexDirection: 'column',
    columnGap: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#33333342'
  },
  profileDetails: {
    gap: 15,
    marginHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  profileEmail: {
    fontSize: 18,
  },
  iconlabelGrouping: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  buttonPrimary: {
    backgroundColor: '#477B61',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnFont: {
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    backgroundColor: '#03312E00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContent: {
    color: '#333333ee',
    textAlign: 'center',
    fontSize: 20,
  },
  /* Other Styles */
  active: {
    borderBottomColor: '#fff',
    borderBottomWidth: 5,
  },
  inactive: {
    borderBottomColor: '#ffffff00',
    borderBottomWidth: 5,
  },
  buttonRoot: {},
  buttonHovered: { backgroundColor: '#00000088' },
  headerHomeView: {
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: '#6A7B7600',
    flexDirection: 'row',
    paddingTop: 7,
    justifyContent: 'space-around',
  },
  headerView: {
    backgroundColor: '#6A7B76',
    flexDirection: 'row',
    paddingTop: 7,
    justifyContent: 'space-around',
  },
  headerIcons: {
    flex: 1,
    flexDirection: 'row',
    padding: 32,
  },
  headerLogoParent: {
    alignSelf: 'center',
  },
  headerLogo: {
    width: 180,
    height: 120,
  },
  headerTouchable: {
    margin: 8,
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  navText: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 18,
    margin: 8,
    paddingHorizontal: 5,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    bottom: -5,
    left: -5,
    backgroundColor: colors.feldgrau,
    borderRadius: 5,
    minWidth: 20,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: 'white',
    fontWeight: 'bold',
  },
});
