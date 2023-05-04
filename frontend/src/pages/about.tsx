import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Platform, ScaledSize, Image, useWindowDimensions } from 'react-native';
import { Footer } from '@/components/Footer';

export const About = () => {
  //Responsive
  const dimensions = useWindowDimensions();
  const checkMobile = (dimensions: ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 768) ? true : false }
  const responsive = checkMobile(dimensions) ? web : web;
  const slideNames = ['Testimonials'];
  return (
    <View style={[responsive.container]}>
      <View style={[responsive.contentContainer]}>
        <ScrollView>
          <View style={[responsive.quoteRow]}>
            <Text style={[responsive.quote]}>
              "We aren't just a bike shop, we're a community."
            </Text>
          </View>
          <View style={[responsive.missionStatementRow]}>
            <Text style={[responsive.missionStatement]}>
              Our mission at Wheely Good Bikes is to provide high-quality
              bicycles and accessories that promote a healthy and sustainable
              lifestyle. We are committed to offering personalized service and
              expert advice to help our customers choose the right bike for
              their needs and skill level. Our goal is to create a welcoming
              environment where cyclists of all ages and abilities can come
              together to share their passion for cycling and enjoy the freedom
              of the open road. At the heart of our mission is a dedication to
              promoting eco-friendly transportation options and helping our
              community reduce its carbon footprint.
            </Text>
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV1, {display: (dimensions.width > 600) ? 'flex' : 'none'}]} />
            <Text style={[responsive.testimonialV1]}>"After that waitress stole my bike, I needed to buy a new one and this shop had the newest model!"</Text>
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Text style={[responsive.testimonialV2]}>"Thank you so much for all of your help! I hope to one day open up a bike shop as nice as yours!"</Text>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV2, {display: (dimensions.width > 600) ? 'flex' : 'none'}]} />
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV1, {display: (dimensions.width > 600) ? 'flex' : 'none'}]} />
            <Text style={[responsive.testimonialV1]}>"This shop opened up down the road from my beet farm, its nice enough."</Text>
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Text style={[responsive.testimonialV2]}>"I just wandered into this shop one day and left with a new bike! Thanks man!"</Text>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV2, {display: (dimensions.width > 600) ? 'flex' : 'none'}]} />
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV1, {display: (dimensions.width > 600) ? 'flex' : 'none'}]} />
            <Text style={[responsive.testimonialV1]}>"This shop has fixed my granddaughters bike 3 times now. Really appreciate it."</Text>
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Text style={[responsive.testimonialV2]}>"The owner of this shop is the nicest, most helpful person you could ask for to help you with all of your bike needs."</Text>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV2, {display: (dimensions.width > 600) ? 'flex' : 'none'}]} />
          </View>
          <View style={{marginBottom: 15}}></View>
          <Footer/>
        </ScrollView>
      </View>
    </View>
  );
};

const mobile = StyleSheet.create({
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
  btn: {
    backgroundColor: 'white',
  },
  quoteRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  quote: {
    fontSize: 27,
    color: 'black',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  missionStatementRow: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  missionStatement: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageV1: {
    borderRadius: 100,
    width: 100,
    height: 100,
    marginRight: 20,
    marginLeft: 20,
  },
  imageV2: {
    borderRadius: 100,
    width: 100,
    height: 100,
    marginLeft: 35,
  },
  testimonialV1: {
    width: 250,
    marginLeft: 0,
    borderWidth: 5,
    borderColor: 'black',
  },
  testimonialV2: {
    width: 210,
    marginLeft: 30,
    marginRight: -15,
  },
  testimonialContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    alignItems: 'center',
  }
});

const web = StyleSheet.create({
  container: {
    backgroundColor: '#1F302D',
  },
  slidesContainer: {

  },
  contentContainer: {

  },
  titleRow: {

  },
  title: {
    
  },
  btn: {

  },
  quoteRow: {

  },
  quote: {
    fontSize: 40,
    marginTop: 10,
    padding: 15,
    alignSelf: 'center',
    color: 'white',
  },
  missionStatementRow: {
    marginHorizontal: 'auto',
    width: 'auto',
    maxWidth: 800,
    borderColor: '#3E6259',
    borderWidth: 5,
    margin: 25,
  },
  missionStatement: {
    fontSize: 25,
    padding: 25,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
  },
  imageV1: {
    borderRadius: 100,
    width: 100,
    height: 100,
    marginLeft: 25,
    marginRight: 25,
  },
  imageV2: {
    borderRadius: 100,
    width: 100,
    height: 100,
    marginLeft: 25,
    marginRight: 25,
  },
  testimonialV1: {
    // width: 250,
    // marginLeft: 0,
    fontSize: 25,
    borderColor: '#6A7B76',
    borderWidth: 5,
    padding: 16,
    borderRadius: 20,
    color: 'white',
  },
  testimonialV2: {
    // width: 210,
    // marginLeft: 30,
    // marginRight: -15,
    fontSize: 25,
    borderColor: '#8B9D83',
    borderWidth: 5,
    padding: 16,
    borderRadius: 20,
    color: 'white',
  },
  testimonialContainer: {
    marginHorizontal: 'auto',
    width: 'auto',
    maxWidth: 600,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    alignItems: 'center',
    //alignSelf: 'center',
  }
});

