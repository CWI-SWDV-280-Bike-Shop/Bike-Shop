import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, ScrollView, Platform, ScaledSize, Image } from 'react-native';
import Swiper from 'react-native-swiper/src';

// Slide component imports
import { Slide } from '../components/Slide'

const checkMobile = (dimensions : ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 1450) ? true : false }
const onlyMobile = (code) => { if ((Platform.OS === 'android' || Platform.OS === 'ios')){ return code } }
const onlyWeb = (code) => { if (Platform.OS === 'web'){ return code } }

// const CustomSwiper = ({dimensions} : {dimensions : ScaledSize}) => {
//   return (
//     <Swiper 
//     loop
//     timeout={5}
//     springConfig={{ speed: 5, bounciness: 1, }}
//     controlsProps={{
//       prevTitle: '⮜',
//       nextTitle: '⮞',
//       dotsTouchable: true,
//       dotsPos: 'bottom',
//       prevPos: (checkMobile(dimensions)) ? false : 'left', 
//       nextPos: (checkMobile(dimensions)) ? false : 'right', 
//       nextTitleStyle: {
//         fontSize: 38,
//         fontWeight: '900',
//         color: '#fff'
//       },
//       prevTitleStyle: {
//         fontSize: 38,
//         fontWeight: '900',
//         color: '#fff'
//       },
//     }}>
//       <Slide
//             name={'From Michael Scott'}
//             description={
//                 '"After that waitress stole my bike, I needed to buy a new one and this shop had the newest model!"'
//             }
//             imgSrc={require('@assets/Images/background1.png')}
//             btnName={'Shop'}
//           />
//           <Slide
//             name={'From Jim Halpert'}
//             description={
//                 '"Thank you so much for all of your help! I hope to one day open up a bike shop as nice as yours!"'
//             }
//             imgSrc={require('@assets/Images/background2.png')}
//             btnName={'Accessories'}
//           />
//           <Slide
//             name={'From Dwight Shrute'}
//             description={'"This shop opened up down the road from my beet farm, its nice enough."'}
//             imgSrc={require('@assets/Images/background3.png')}
//             btnName={'Shop'}
//           />
//           <Slide
//             name={'From Creed Bratton'}
//             description={
//                 '"I just wandered into this shop one day and left with a new bike! Thanks man!"'
//             }
//             imgSrc={require('@assets/Images/background1.png')}
//             btnName={'Shop'}
//           />
//           <Slide
//             name={'From Stanley Hudson'}
//             description={
//               '"This shop has fixed my granddaughters bike 3 times now. Really appreciate it."'
//             }
//             imgSrc={require('@assets/Images/background2.png')}
//             btnName={'Repair'}
//           />
//             <Slide
//             name={'From David Wallace'}
//             description={
//               '"The owner of this shop is the nicest, most helpful person you could ask for to help you with all of your bike needs."'
//             }
//             imgSrc={require('@assets/Images/background3.png')}
//             btnName={'Repair'}
//           />
//     </Swiper>
//   );
// }

export const About = () => {
  const slideNames = ['Testimonials'];
  return (
    <View style={[styles.container]}>
      <View style={[styles.contentContainer]}>
        <ScrollView>
        <View style={[styles.quoteRow]}>
            <Text style={[styles.quote]}>
              "We aren't just a bike shop, we're a community."
            </Text>
          </View>
        <View style={[styles.missionStatementRow]}>
            <Text style={[styles.missionStatement]}>
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
        <View style={[styles.testimonialContainer]}>
          <Image source={require('../assets/Branding/profile-black.png')} style={[styles.imageV1]} />
          <Text style={[styles.testimonialV1]}>"After that waitress stole my bike, I needed to buy a new one and this shop had the newest model!"                            - Michael Scott</Text>
        </View>
        <View style={[styles.testimonialContainer]}>
          <Text style={[styles.testimonialV2]}>"Thank you so much for all of your help! I hope to one day open up a bike shop as nice as yours!"                                      - Jim Halpert</Text>
          <Image source={require('../assets/Branding/profile-black.png')} style={[styles.imageV2]} />
        </View>
        <View style={[styles.testimonialContainer]}>
          <Image source={require('../assets/Branding/profile-black.png')} style={[styles.imageV1]} />
          <Text style={[styles.testimonialV1]}>"This shop opened up down the road from my beet farm, its nice enough."      - Dwight Shrute</Text>
        </View>
        <View style={[styles.testimonialContainer]}>
          <Text style={[styles.testimonialV2]}>"I just wandered into this shop one day and left with a new bike! Thanks man!"      - Creed Bratton</Text>
          <Image source={require('../assets/Branding/profile-black.png')} style={[styles.imageV2]} />
        </View>
        <View style={[styles.testimonialContainer]}>
          <Image source={require('../assets/Branding/profile-black.png')} style={[styles.imageV1]} />
          <Text style={[styles.testimonialV1]}>"This shop has fixed my granddaughters bike 3 times now. Really appreciate it."                                 - Stanley Hudson</Text>
        </View>
        <View style={[styles.testimonialContainer]}>
          <Text style={[styles.testimonialV2]}>"The owner of this shop is the nicest, most helpful person you could ask for to help you with all of your bike needs." - David Wallace</Text>
          <Image source={require('../assets/Branding/profile-black.png')} style={[styles.imageV2]} />
        </View>
        <View><Text></Text></View>
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
