import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Card component import
import { ItemCard } from '../components/Cards/ItemCards';

//Footer Import
import { Footer } from '../components/Footer';

export const Shop = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={[styles.searchbar]}>
          <Text>Here is the search bar</Text>
        </View>
        <View style={[styles.number]}>
          <Text>Showing 1 - 25 out of 100</Text>
        </View>
        <View style={[styles.sortby]}>
          <Text>Sort by:</Text>
        </View>
        <View style={[styles.cardContainer]}>
          <View style={[styles.cards]}>
            <ItemCard
              name={'City Bike'}
              price={'$300.00'}
              imgSrc={require('../../assets/Media/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
              brakes={'Disc Brakes'}
            />
            <ItemCard
              name={'City Bike'}
              price={'$300.00'}
              imgSrc={require('../../assets/Media/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
              brakes={'Disc Brakes'}
            />
            <ItemCard
              name={'City Bike'}
              price={'$300.00'}
              imgSrc={require('../../assets/Media/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
              brakes={'Disc Brakes'}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    flex: 0.5,
  },
  number: {
    flex: 0.5,
  },
  sortby: {
    flex: 0.5,
  },
  cards: {
    flexDirection: 'column',
    gap: 8,
    flex: 1,
    padding: 15,
  },
  cardContainer: {
    flex: 15,
    backgroundColor: '#D3D5D4',
  },
  header: {
    margin: 20,
    fontSize: 48,
    color: '#262626',
  },
  bodyText: {
    marginHorizontal: 20,
    fontSize: 24,
    color: '#262626',
  },
});
