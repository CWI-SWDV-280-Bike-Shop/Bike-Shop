import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, Image, ScaledSize } from 'react-native';

export const Footer = ({dimensions} : {dimensions? : ScaledSize}) => {
  const responsiveWizard = (value) => dimensions.width * (value/1920)
  const styles = StyleSheet.create({
    footerLogo: {
      width: 180,
      height: 120,
    },
    block: {
      width: 300,
      flexDirection: 'column',
      gap: 5,
      paddingHorizontal: 40,
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
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      paddingVertical: 20,
    },
    subcontainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      gap: 40,
      paddingVertical: 20,
    },
  });
    
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
    </View>
  );
};
