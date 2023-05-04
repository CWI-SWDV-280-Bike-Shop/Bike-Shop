import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Platform, ScaledSize, Image, useWindowDimensions } from 'react-native';
import { Footer } from '@/components/Footer';
import { ImageBackground } from 'react-native';

export const About = () => {
  //Responsive
  const dimensions = useWindowDimensions();
  const checkMobile = (dimensions: ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 768) ? true : false }
  const responsive = checkMobile(dimensions) ? mobile : web;
  const slideNames = ['Testimonials'];
  return (
    <View style={[responsive.container]}>
      <View style={[responsive.contentContainer]}>
        <ScrollView>
          <ImageBackground style={styles.backgroundImage} source={require('../assets/Images/bicycle-repair.jpg')}>
            <View style={styles.overlay} />
            <View style={styles.hero}>
              <View style={[responsive.missionStatementRow]}>
                <View style={[responsive.quoteRow]}>
                  <Text style={[responsive.quote]}>
                    "We aren't just a bike shop, we're a community."
                  </Text>
                </View>
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
            </View>
          </ImageBackground>

          <View style={[responsive.testimonialContainer]}>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV1, { display: (dimensions.width > 600) ? 'flex' : 'none' }]} />
            <Text style={[responsive.testimonialV1]}>"After that waitress stole my bike, I needed to buy a new one and this shop had the newest model!"</Text>
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Text style={[responsive.testimonialV2]}>"Thank you so much for all of your help! I hope to one day open up a bike shop as nice as yours!"</Text>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV2, { display: (dimensions.width > 600) ? 'flex' : 'none' }]} />
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV1, { display: (dimensions.width > 600) ? 'flex' : 'none' }]} />
            <Text style={[responsive.testimonialV1]}>"This shop opened up down the road from my beet farm, its nice enough."</Text>
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Text style={[responsive.testimonialV2]}>"I just wandered into this shop one day and left with a new bike! Thanks man!"</Text>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV2, { display: (dimensions.width > 600) ? 'flex' : 'none' }]} />
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV1, { display: (dimensions.width > 600) ? 'flex' : 'none' }]} />
            <Text style={[responsive.testimonialV1]}>"This shop has fixed my granddaughters bike 3 times now. Really appreciate it."</Text>
          </View>
          <View style={[responsive.testimonialContainer]}>
            <Text style={[responsive.testimonialV2]}>"The owner of this shop is the nicest, most helpful person you could ask for to help you with all of your bike needs."</Text>
            <Image source={require('../assets/Branding/profile-white.png')} style={[responsive.imageV2, { display: (dimensions.width > 600) ? 'flex' : 'none' }]} />
          </View>

          <View style={{ marginBottom: 15 }}></View>

          <Footer />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 400,
    padding: 5
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const mobile = StyleSheet.create({
  container: {
    backgroundColor: '#1F302D',
  },
  contentContainer: {

  },
  quoteRow: {

  },
  quote: {
    fontSize: 30,
    marginTop: 10,
    padding: 15,
    textAlign: 'center',
    color: 'white',
  },
  missionStatementRow: {
    marginHorizontal: 'auto',
    width: 'auto',
    maxWidth: 1200,
    borderColor: '#3E6259',
    borderWidth: 5,
    margin: 25,
    marginTop: 10,
  },
  missionStatement: {
    fontSize: 25,
    padding: 15,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
  },
  imageV1: {
    borderRadius: 100,
    width: 50,
    height: 50,
    alignSelf: 'flex-start',
  },
  imageV2: {
    borderRadius: 100,
    width: 50,
    height: 50,
    alignSelf: 'flex-start',
  },
  testimonialV1: {
    fontSize: 22,
    borderColor: '#6A7B76',
    borderWidth: 5,
    padding: 15,
    borderRadius: 20,
    color: 'white',
    width: 325,
    textAlign: 'center',
    marginLeft: 5,
  },
  testimonialV2: {
    fontSize: 22,
    borderColor: '#8B9D83',
    borderWidth: 5,
    padding: 15,
    borderRadius: 20,
    color: 'white',
    width: 325,
    height: 145,
    textAlign: 'center',
    marginRight: 5,
    justifyContent: 'center',
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

const web = StyleSheet.create({
  container: {
    backgroundColor: '#1F302D',
  },
  contentContainer: {

  },
  quoteRow: {

  },
  quote: {
    fontSize: 40,
    marginTop: 10,
    padding: 15,
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 }
  },
  missionStatementRow: {
    marginHorizontal: 'auto',
    width: 'auto',
    maxWidth: 900,
    borderColor: '#3E6259',
    borderWidth: 5,
    margin: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.8)'
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
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    alignItems: 'center',
    //alignSelf: 'center',
    margin: 10,
  }
});