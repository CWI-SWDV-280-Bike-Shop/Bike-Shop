import * as React from 'react';
import {  Text, StyleSheet, View } from 'react-native';

export const Admin = () => {
    return (
      <View style={[styles.container]}>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.header]}>Admin</Text>
          <Text style={[styles.bodyText]}>
            This is the admin page.
          </Text>
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
    margin: 20,
    fontSize: 48,
    color: "#262626"
  },
  bodyText: {
    marginHorizontal: 20,
    fontSize: 24,
    color: "#262626"
  },
});