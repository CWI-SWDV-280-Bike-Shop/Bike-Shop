import { DrawerHeaderProps } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Navigation Header
export const NavigationHeader = ({ navigation }: DrawerHeaderProps) => {
  return (
    <View style={styles.headerView}>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={navigation.openDrawer}
        >
          <Icon name="menu-outline" size={40} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerLogoParent}>
        <Image
          source={require('@assets/Branding/OfficialLogo-white.png')}
          style={styles.headerLogo}
        />
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerTouchable}>
          <Icon name="cart-outline" size={40} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
//Header Stylesheetr
const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    backgroundColor: '#6A7B76',
    paddingTop: 7,
  },
  headerIcons: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerLogoParent: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  headerLogo: {
    width: 180,
    height: 120,
  },
  headerTouchable: {
    margin: 8,
  },
});
