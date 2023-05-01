import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, View, ScrollView, Platform, ScaledSize, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-web-swiper';
// Slide component imports
import { Slide } from '@components/Slide';
//Footer Import
import { Footer } from '@components/Footer';

const checkMobile = (dimensions : ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 1450) ? true : false }


const CustomSwiper = ({dimensions} : {dimensions : ScaledSize}) => {
  return (
    <Swiper 
    loop
    timeout={5}
    springConfig={{ speed: 5, bounciness: 1, }}
    containerStyle={{height: Math.min(600, Math.max(300, dimensions.width/2))}}
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
  //A little helper guy
  const responsiveWizard = (value) => dimensions.width * (value/1920)
  const mobile = StyleSheet.create({
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
      paddingHorizontal: responsiveWizard(30),
      marginHorizontal: responsiveWizard(30),
      marginBottom: (checkMobile(dimensions)) ? 20 : -30,
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: responsiveWizard(20),
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
      display: (400+650 < dimensions.width) ? 'flex' : 'none',
      borderRadius: 200,
      height: 400,
      width: 400,
      opacity: .65,
      resizeMode: 'cover',
    },
    heroText: {
      textTransform: 'uppercase',
      fontSize: Math.max(36, responsiveWizard(60)),
      fontWeight: 'bold',
      color: '#fff'
    },
    block: {
      borderColor: '#3fab82',
      borderTopWidth: 10,
      flexDirection: 'column',
      padding: 30,
      paddingHorizontal: responsiveWizard(50),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 1,
      flexWrap: 'wrap',
      maxWidth: Math.min(600, dimensions.width * .9),
      backgroundColor: '#3c4b48'
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
      paddingHorizontal: `${responsiveWizard(5)}%`,
      paddingVertical: 40,
      paddingBottom: 70,
      backgroundColor: '#1F302D',
    },
  });
  
  const styles = mobile;
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
  return (
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
        </View>
        <Footer dimensions={dimensions}/>
      </View>
    </ScrollView>
    );
  };
