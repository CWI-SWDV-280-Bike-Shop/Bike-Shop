import * as React from 'react';
import {  Text, StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

// Slide component imports
import { CityBike } from '../Components/Slides/CityBike';
import { EBike } from '../Components/Slides/EBike';
import { KidBike } from '../Components/Slides/KidBike';
import { MtnBike } from '../Components/Slides/MtnBike';
import { RepairShop } from '../Components/Slides/RepairShop';

 
export const Home = () => {
    
    return (
      <View style={[styles.container]}>
        <View style={[styles.slidesContainer]}>
          <Swiper>
            <CityBike />
            <EBike />
            <KidBike />
            <MtnBike />
            <RepairShop />
          </Swiper>
        </View>
        <View style={[styles.contentContainer]}></View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  slidesContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 2,
  }
});