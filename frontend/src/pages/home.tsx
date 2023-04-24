import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, ScrollView, Platform, TouchableOpacity } from 'react-native';
//import Swiper from 'react-native-swiper/src';
import Swiper from 'react-native-web-swiper';

// Slide component imports
import { Slide } from '@components/Slide';

//Footer Import
import { Footer } from '@components/Footer';

const checkMobile = () => { return (Platform.OS === 'android' || Platform.OS === 'ios') ? true : false }
const onlyMobile = (code) => { if ((Platform.OS === 'android' || Platform.OS === 'ios')){ return code } }
const onlyWeb = (code) => { if (Platform.OS === 'web'){ return code } }

/* cellsStyle: (!checkMobile()) ? {
  'right': { 
    padding: 20, 
    backgroundColor: '#ffffff2a',
  },
  'left': { 
    padding: 20, 
    backgroundColor: '#ffffff2a',
  },
} : {} */

const CustomSwiper = () => {
  return (
    <Swiper 
    loop
    timeout={5}
    springConfig={{ speed: 5, bounciness: 1, }}
    controlsProps={{
      prevTitle: '⮜',
      nextTitle: '⮞',
      dotsTouchable: true,
      dotsPos: 'bottom',
      prevPos: (checkMobile()) ? false : 'left', 
      nextPos: (checkMobile()) ? false : 'right', 
      nextTitleStyle: {
        fontSize: 38,
        fontWeight: '900',
        color: '#fff'
      },
      prevTitleStyle: {
        fontSize: 38,
        fontWeight: '900',
        color: '#fff'
      },
    }}>
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
  );
}

const quote = `"We aren't just a bike shop, we're a community."`;
const mission = [`Our mission at Wheely Good Bikes is to provide high-quality bicycles and accessories that promote a healthy and sustainable lifestyle. We are committed to offering personalized service and expert advice to help our customers choose the right bike for their needs and skill level.`, 
                `Our goal is to create a welcoming environment where cyclists of all ages and abilities can come together to share their passion for cycling and enjoy the freedom of the open road.`, 
                `At the heart of our mission is a dedication to promoting eco-friendly transportation options and helping our community reduce its carbon footprint.`]

export const Home = () => {
  const slideNames = ['City Bikes'];
  if ((Platform.OS === 'android' || Platform.OS === 'ios')) {
    return (
      <View style={[styles.container]}>
        <View style={[styles.slidesContainer]}>
          <CustomSwiper/>
        </View>
        <View style={[styles.contentContainer]}>
            <ScrollView>
            {/* <View style={[styles.titleRow]}>
              <Text style={[styles.title]}>Wheely Good Bikes</Text>
            </View> */}
            <View style={[styles.quoteRow]}>
              <Text style={[styles.quote]}>
                {quote}
              </Text>
            </View>
            <View style={[styles.missionStatementRow]}>
              <Text style={[styles.missionStatement]}>
                {mission}
              </Text>
            </View>
            <Footer />
            </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
    <ScrollView>
      <View style={[styles.container]}>
      <View style={[styles.slidesContainer]}>
        <CustomSwiper/>
      </View>
      <View style={[styles.contentContainer]}>
          <View style={[styles.quoteRow]}>
            <Text style={[styles.quote]}>
              {quote}
            </Text>
          </View>
          <View style={[styles.missionStatementRow]}>
            <Icon name="megaphone-outline"
              size={40}
            />
            <Text style={[styles.missionStatement]}>
              {mission[0]}
            </Text>
            <Icon name="flag-outline"
              size={40}
            />
            <Text style={[styles.missionStatement]}>
              {mission[1]}
            </Text>
            <Icon name="heart-outline"
              size={40}
            />
            <Text style={[styles.missionStatement]}>
              {mission[2]}
            </Text>
          </View>
      </View>
      <Footer />
    </View>
  </ScrollView>
    );
  }
};

const mobile = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slidesContainer: {
    flexDirection: 'column',
    height: 250
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: '#6A7B76',
    borderColor: '#03312E',
    borderWidth: 15,
    width: '100%',
  },
  quote: {
    fontSize: 27,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  missionStatementRow: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  },
  missionStatement: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#03312E',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

//Web Stylesheet
const web = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slidesContainer: {
    flexDirection: 'row',
    flex: 3,
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%'
  },
  quoteRow: {
    margin: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: '#446058',
    width: 'fit-content'
  },
  quote: {
    fontSize: 27,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  missionStatementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000002a',
    padding: 15,
    borderRadius: 10,
    //flex: 1, 
    marginTop: 20,
    marginBottom: 20,
  },
  missionStatement: {
    /* borderRightWidth: 5,
    borderColor: '#03312E', */
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 20,
    color: '#03312E',
    paddingLeft: 15,
    paddingRight: 15
  },
});

let styles;
if ((Platform.OS === 'android' || Platform.OS === 'ios')) {
  styles = mobile;
} else {
  styles = web;
}
