import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper/src';

// Slide component imports
import { Slide } from '@components/Slide';

//Footer Import
import { Footer } from '@components/Footer';

export const Home = () => {
  const slideNames = ['City Bikes'];
  return (
    <View style={[styles.container]}>
      <ScrollView>
      <View style={[styles.slidesContainer]}>
        <Swiper>
          <Slide
            name={'City Bikes'}
            description={
              'Shop our collection of bikes built for busy city streets.'
            }
            imgSrc={require('@assets/Images/citybikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'eBikes'}
            description={
              'Our eBikes are efficient and will save you money on your commute.'
            }
            imgSrc={require('@assets/Images/ebikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={"Kid's Bikes"}
            description={'Bikes for anyone in your family, available now.'}
            imgSrc={require('@assets/Images/kidsbikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'Mountain Bikes'}
            description={
              'We have rugged mountain bikes to get you out on the trails.'
            }
            imgSrc={require('@assets/Images/mtnbikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'Repair Shop'}
            description={
              'If your bike breaks down, our repair shop has you covered. Give us a call!'
            }
            imgSrc={require('@assets/Images/repairshopimg.png')}
            btnName={'Contact'}
          />
        </Swiper>
        <Footer />
      </View>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slidesContainer: {
    // flexDirection: 'column',
    // flex: 2,
  },
  titleRow: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 45,
    alignSelf: 'center',
    color: '#03312E',
  },
});
