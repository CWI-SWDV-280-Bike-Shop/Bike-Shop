import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, ScrollView } from 'react-native';

export const Footer = () => {
  return (
    <View style={[styles.container]}>
      
          <View style={[styles.footer]}>
            <Text style={[styles.footerText]}>The Bicycle Shop</Text>
            <Text style={[styles.footerText]}>
              <Icon name="navigate-outline" size={15} color="#FFF" /> 1234
              Something Blvd, Boise, ID 83706
            </Text>
            <Text style={[styles.footerText]}>Monday - Friday | 9am - 8pm</Text>
            <Text style={[styles.footerText]}>
              <Icon name="receipt-outline" size={15} color="#FFF" />{' '}
              contact@thebicycleshop.com
            </Text>
            <Text style={[styles.footerText]}>
              <Icon name="phone-portrait-outline" size={15} color="#FFF" />{' '}
              (208)123-4567
            </Text>
            <Text style={[styles.footerText]}>© Copyright 2023</Text>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6A7B76',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  footer: {
    flexDirection: 'column',
    backgroundColor: '#6A7B76',
    paddingTop: 7,
    paddingBottom: 7,
  },
  footerText: {
    alignSelf: 'center',
    color: 'white',
    paddingTop: 1,
    paddingBottom: 1,
    fontWeight: 'bold',
  },
});
