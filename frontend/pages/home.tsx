import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper/src';

// Slide component imports
import { Slide } from '../Components/Slide';

export const Home = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.slidesContainer]}>
        <Swiper>
          <Slide
            name={'Road Bikes'}
            description={
              'Shop our collection of bikes built for busy city streets.'
            }
            imgSrc={require('../Media/Images/citybikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'eBikes'}
            description={
              'Our eBikes are efficient and will save you money on your commute.'
            }
            imgSrc={require('../Media/Images/ebikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={"Kid's Bikes"}
            description={'Bikes for anyone in your family, available now.'}
            imgSrc={require('../Media/Images/kidsbikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'Mountain Bikes'}
            description={
              'We have rugged mountain bikes to get you out on the trails.'
            }
            imgSrc={require('../Media/Images/mtnbikestockimg.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'Repair Shop'}
            description={
              'If your bike breaks down, our repair shop has you covered. Give us a call!'
            }
            imgSrc={require('../Media/Images/repairshopimg.png')}
            btnName={'Contact'}
          />
        </Swiper>
      </View>
      <View style={[styles.contentContainer]}>
        <ScrollView>
          <View style={[styles.titleRow]}>
            <Text style={[styles.title]}>Wheely Good Bikes</Text>
          </View>
          <View style={[styles.quoteRow]}>
            <Text style={[styles.quote]}>
              "Here we aren't just a bikeshop. We're a community."
            </Text>
          </View>
          <View style={[styles.missionStatementRow]}>
            <Text style={[styles.missionStatement]}>
              Our mission Wheely Good Bikes is to provide high-quality bicycles
              and accessories that promote a healthy and sustainable lifestyle.
              We are committed to offering personalized service and expert
              advice to help our customers choose the right bike for their needs
              and skill level. Our goal is to create a welcoming environment
              where cyclists of all ages and abilities can come together to
              share their passion for cycling and enjoy the freedom of the open
              road. At the heart of our mission is a dedication to promoting
              eco-friendly transportation options and helping our community
              reduce its carbon footprint.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slidesContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 2,
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
  quoteRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#03312E',
    width: '100%',
  },
  quote: {
    fontSize: 35,
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  missionStatementRow: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
  },
  missionStatement: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#03312E',
  },
});
