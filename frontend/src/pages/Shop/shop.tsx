import * as React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
// import BikeCards from '@components/ProductPage/Cards/BikeCards'
import { Search_Bar } from '@/components/ProductPage/searchBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ItemCard } from '@components/ProductPage/Cards/ItemCards';
import { Footer } from '@components/Footer';
import { FilterParams } from '@components/ProductPage/filter';

export const Shop = () => {
  return (
    <View style={[Layout.container]}>
      <ScrollView>
        <View style={[styles.searchFilter]}>
          <View style={[styles.searchbar]}>
            <Search_Bar />
          </View>
          <View>
            <FilterParams/>
          </View>
          <View style={[styles.number]}>
            <Text>
              Showing 1 - 25 out of 100
            </Text>
          </View>
        </View>
        <View style={[Layout.cardContainer]}>
          <View style={[Layout.card]}>
            <ItemCard
              name={'City Bike'}
              price={
                '$300.00'
              }
              imgSrc={require('../../assets/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
            />
            <ItemCard
              name={'City Bike'}
              price={
                '$300.00'
              }
              imgSrc={require('../../assets/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
            />
            <ItemCard
              name={'City Bike'}
              price={
                '$300.00'
              }
              imgSrc={require('../../assets/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchbar: {
    flex: 2
  },
  number: {
    flex: 1,
  },
  cards: {
    flexDirection: 'column',
    gap: 8,
    flex: 1,
    padding: 15
  },
  cardContainer: {
    flex: 15,
    backgroundColor: '#D3D5D4',
  },
  header: {
    margin: 20,
    fontSize: 48,
    color: "#262626"
  },
  bodyText: {
    marginHorizontal: 20,
    fontSize: 24,
    color: "#262626"
  },
  searchFilter: {
    flex: 3,
  },
});
