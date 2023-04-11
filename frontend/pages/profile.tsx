import * as React from 'react';
import {  Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Profile = () => {
    return (
      <View style={[styles.container]}>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.header]}>Welcome, user_name</Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonCol}>
              <TouchableOpacity style={styles.button}>
                <Icon 
                  name="receipt-outline"
                  size={60}
                  color="#FFF"
                />
                <Text style={styles.buttonContent}>Orders</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonCol}>
            <TouchableOpacity style={styles.button}>
            <Icon 
                  name="person-circle-outline"
                  size={60}
                  color="#FFF"
                />
                <Text style={styles.buttonContent}>Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.buttonCol}>
            <TouchableOpacity style={styles.button}>
                <Icon 
                  name="key-outline"
                  size={60}
                  color="#FFF"
                />
                <Text style={styles.buttonContent}>Admin</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonCol}>
            <TouchableOpacity style={styles.button}>
                <Icon 
                  name="log-out-outline"
                  size={60}
                  color="#FFF"
                />
                <Text style={styles.buttonContent}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonRow}></View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D3D5D4',
  }, 
  header: {
    fontSize: 48,
    color: "#262626",
    margin: 20
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#03312E",
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  buttonContent: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 20
  }
});