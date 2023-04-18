import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper/src';

// Slide component imports
import { Slide } from '../components/Slide'

export const About = () => {
  const slideNames = ['Testimonials'];
  return (
    <View style={[styles.container]}>
      <View style={[styles.slidesContainer]}>
        <Swiper>
          <Slide
            name={'From Michael Scott'}
            description={
                '"After that waitress stole my bike, I needed to buy a new one and this shop had the newest model!"'
            }
            imgSrc={require('../../../frontend/src/assets/Images/background1.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'From Jim Halpert'}
            description={
                '"Thank you so much for all of your help! I hope to one day open up a bike shop as nice as yours!"'
            }
            imgSrc={require('../../../frontend/src/assets/Images/background2.png')}
            btnName={'Accessories'}
          />
          <Slide
            name={'From Dwight Shrute'}
            description={'"This shop opened up down the road from my beet farm, its nice enough."'}
            imgSrc={require('../../../frontend/src/assets/Images/background3.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'From Creed Bratton'}
            description={
                '"I just wandered into this shop one day and left with a new bike! Thanks man!"'
            }
            imgSrc={require('../../../frontend/assets/Media/Images/background1.png')}
            btnName={'Shop'}
          />
          <Slide
            name={'From Stanley Hudson'}
            description={
              '"This shop has fixed my granddaughters bike 3 times now. Really appreciate it."'
            }
            imgSrc={require('../../../frontend/assets/Media/Images/background2.png')}
            btnName={'Repair'}
          />
            <Slide
            name={'From David Wallace'}
            description={
              '"The owner of this shop is the nicest, most helpful person you could ask for to help you with all of your bike needs."'
            }
            imgSrc={require('../../../frontend/assets/Media/Images/background3.png')}
            btnName={'Repair'}
          />
        </Swiper>
      </View>
      <View style={[styles.contentContainer]}>
        <ScrollView>
          {/* <View style={[styles.titleRow]}>
            <Text style={[styles.title]}>Wheely Good Bikes</Text>
          </View> */}
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
    marginBottom: 20,
  },
  missionStatement: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#03312E',
    paddingLeft: 15,
    paddingRight: 15,
  },
  footer: {
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
