import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Orders } from './orders';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '@context/auth.context';
import { useContext } from 'react';

export const Profile = ({ navigation, dimensions }) => {
  const { isLoggedIn, authUser } = useContext(AuthContext);
  const username = isLoggedIn && authUser.name;
  const email = isLoggedIn && authUser.email;

  return (
    <View style={[styles.container]}>
      <View style={styles.profileRow}>
        <View style={styles.profileImage}><Icon name="person-circle-outline" size={100} color="#FFF" /></View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('Account')}
        >
          <Text style={styles.btnFont}>Edit Profile</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileLinks}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Orders')}
        >
          <View style={styles.iconlabelGrouping}>
            <Icon name="receipt-outline" size={24} color="#333333ee" />
            <Text style={styles.buttonContent}>Orders</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#333333ee"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Admin')}
        >
          <View style={styles.iconlabelGrouping}>
            <Icon name="key-outline" size={24} color="#333333ee" />
            <Text style={styles.buttonContent}>Admin</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#333333ee"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconlabelGrouping}>
            <Icon name="log-out-outline" size={24} color="#333333ee" />
            <Text style={styles.buttonContent}>Logout</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#333333ee"/>
        </TouchableOpacity>
      </View>
      {/* <View style={[styles.contentContainer]}>
        <Text style={[styles.header]}>Welcome, {username}</Text>
        <View style={styles.buttonRow}>
          
        </View>
        <View style={styles.buttonRow}></View>
      </View> */}
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
  contentContainer: {
    flex: 1,
    backgroundColor: '#D3D5D4',
  },
  header: {
    fontSize: 48,
    color: '#262626',
    margin: 20,
  },
  buttonPrimary: {
    backgroundColor: '#477B61',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
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
});
