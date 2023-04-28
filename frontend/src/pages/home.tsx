import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, ScrollView, Platform, ScaledSize, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-web-swiper';
// Slide component imports
import { Slide } from '@components/Slide';
//Footer Import
import { Footer } from '@components/Footer';

const checkMobile = (dimensions : ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 1450) ? true : false }
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

const CustomSwiper = ({dimensions} : {dimensions : ScaledSize}) => {
  return (
    <Swiper 
    loop
    timeout={5}
    springConfig={{ speed: 5, bounciness: 1, }}
    containerStyle={web.slides}
    controlsProps={{
      prevTitle: '⮜',
      nextTitle: '⮞',
      dotsTouchable: true,
      dotsPos: 'bottom',
      prevPos: (checkMobile(dimensions)) ? false : 'left', 
      nextPos: (checkMobile(dimensions)) ? false : 'right', 
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

export const Home = ({dimensions} : {dimensions : ScaledSize}) => {
  const styles = (checkMobile(dimensions)) ? mobile : web;
  const slideNames = ['City Bikes'];
  const content = [
    {
      "image": require('../assets/Images/home_bikes.jpg'),
      "hero": "Bicycles",
      "content": "Our mission is to provide high-quality bicycles and accessories that promote a healthy and sustainable lifestyle. We are committed to offering personalized service and expert advice to help our customers choose the right bike for their needs and skill level."
    },
    {
      "image": require('../assets/Images/home_repair.jpg'),
      "hero": "Services",
      "content": "Our goal is to create a welcoming environment where cyclists of all ages and abilities can come together to share their passion for cycling and enjoy the freedom of the open road."
    },
    {
      "image": require('../assets/Images/home_accessories.jpg'),
      "hero": "Accessories",
      "content": "At the heart of our mission is a dedication to promoting eco-friendly transportation options and helping our community reduce its carbon footprint."
    }
  ]
  return (checkMobile(dimensions)) ?
    (
      <ScrollView>
      <View style={[styles.container]}>
        <View style={[styles.slidesContainer]}>
          <CustomSwiper dimensions={dimensions}/>
        </View>
        <View style={[styles.contentContainer]}>
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
        </View>
      </View>
      </ScrollView>
    ) : (
    <ScrollView>
      <View style={[styles.container]}>
        <View style={[styles.slidesContainer]}>
          <CustomSwiper dimensions={dimensions}/>
        </View>
        <View style={[styles.contentContainer]}>
          {
            content.map((item, i) => (
              <View style={[styles.row, (i%2==0) ? styles.evenRow : styles.oddRow]} key={i}>
                <View style={styles.bodyimage}>
                <Image
                  source={item.image}
                  style={styles.bodyimageBox}
                />
                </View>
                <View style={styles.block}>
                  <Text style={styles.heroText}>{item.hero}</Text>
                  <Text style={styles.basicText}>{item.content}</Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>View {item.hero}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          }
            {/* <View style={[styles.quoteRow]}>
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
            </View> */}
        </View>
        <Footer />
    </View>
  </ScrollView>
    );
  };

const mobile = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    borderColor: '#3fab82',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonText: {
    color: '#3fab82',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    margin: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 20,
  },
  evenRow: {
      flexDirection: 'row'
  },
  oddRow: {
      flexDirection: 'row-reverse'
  },
  bodyimage: {
    height: 400,
    width: 400,
    backgroundColor: '#477b61'
  },
  bodyimageBox: {
    height: 400,
    width: 400,
    resizeMode: 'cover',
    opacity: 0.25
  },
  heroText: {
      textTransform: 'uppercase',
      fontSize: 60,
      fontWeight: 'bold'
  },
  block: {
      flexDirection: 'column'
  },
  basicText: {
      fontSize: 18,
  },
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    borderColor: '#3fab82',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonGroup: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  slides: {
    height: 600,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginHorizontal: 30,
    marginBottom: -30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 20,
  },
  evenRow: {
      flexDirection: 'row',
  },
  oddRow: {
      flexDirection: 'row-reverse',
  },
  bodyimage: {
    borderRadius: 200,
    backgroundColor: '#3fab82'
  },
  bodyimageBox: {
    borderRadius: 200,
    height: 400,
    width: 400,
    opacity: .65,
    resizeMode: 'cover',
  },
  heroText: {
    textTransform: 'uppercase',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  block: {
      borderColor: '#3fab82',
      borderTopWidth: 10,
      flexDirection: 'column',
      padding: 30,
      paddingHorizontal: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 1,
      flexWrap: 'wrap',
      maxWidth: 600,
      backgroundColor: '#ffffff20'
  },
  basicText: {
      fontSize: 18,
      color: '#fff'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slidesContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 2,
    paddingHorizontal: '5%',
    paddingVertical: 40,
    paddingBottom: 70,
    backgroundColor: '#1F302D',
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
    marginTop: 20,
    marginBottom: 20,
  },
  missionStatement: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 20,
    color: '#03312E',
    paddingLeft: 15,
    paddingRight: 15
  }
});

