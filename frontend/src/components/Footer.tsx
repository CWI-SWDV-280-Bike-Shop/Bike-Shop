import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, Image } from 'react-native';

export const Footer = () => {
  return (
    <View style={[styles.container]}>
        <View style={styles.subcontainer}>
          <Image
            source={require('../assets/Branding/OfficialLogo-white.png')}
            style={styles.footerLogo}
          />
        </View>
        <View style={styles.subcontainer}>

          <View style={styles.block}>
            <View style={styles.titleBlock}>
              <Icon name="hourglass-outline" size={15} color="#FFF" />
              <Text style={[styles.defaultText, styles.title]}>Store Hours</Text>
            </View>
            <Text style={styles.defaultText}>Mon - Fri | 9am - 8pm</Text>
            <Text style={styles.defaultText}>Sat | 11am - 5pm</Text>
            <Text style={styles.defaultText}>Sun | closed</Text>
          </View>

          <View style={styles.block}>
            <View style={styles.titleBlock}>
              <Icon name="navigate-outline" size={15} color="#FFF" />
              <Text style={[styles.defaultText, styles.title]}>Location</Text>
            </View>
            <Text style={styles.defaultText}>12073 Bannock St. Boise, ID 83706</Text>
          </View>

          <View style={styles.block}>
            <View style={styles.titleBlock}>
              <Icon name="phone-portrait-outline" size={15} color="#FFF" />
              <Text style={[styles.defaultText, styles.title]}>Reach Out</Text>
            </View>
            <Text style={styles.defaultText}>(203) 446-1785</Text>
          </View>

          <View style={styles.block}>
            <View style={styles.titleBlock}>
              <Icon name="logo-instagram" size={15} color="#FFF" />
              <Text style={[styles.defaultText, styles.title]}>Instagram</Text>
            </View>
            <View style={styles.titleBlock}>
              <Icon name="logo-twitter" size={15} color="#FFF" />
              <Text style={[styles.defaultText, styles.title]}>Twitter</Text>
            </View>
          </View>
          
        </View>
          {/* <View style={[styles.footer]}>
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
          </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  footerLogo: {
    width: 180,
    height: 120,
  },
  block: {
    flexDirection: 'column',
    gap: 5,
    marginHorizontal: 30,
  },
  defaultText: {
    color: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleBlock: {
    flexDirection: 'row',
    columnGap: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  subcontainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 20,
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

