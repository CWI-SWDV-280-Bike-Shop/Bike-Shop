import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
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
        <View style={[Layout.searchFilter]}>
          <View style={[Layout.searchbar]}>
            <Search_Bar />
          </View>
          <View>
            <FilterParams/>
          </View>
          <View style={[Layout.text]}>
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