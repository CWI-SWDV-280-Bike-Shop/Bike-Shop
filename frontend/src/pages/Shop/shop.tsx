import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Layout from '@styles/layout/Layout';
// import BikeCards from '@components/ProductPage/Cards/BikeCards'
import { Search_Bar } from '@/components/ProductPage/searchBar';
import { ItemCard } from '@components/ProductPage/Cards/ItemCards';
import { Footer } from '@components/Footer';
import { FilterParams } from '@components/ProductPage/filter';
import { ListProducts } from '@components/ProductPage/Cards/BikeCards'

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
            <ListProducts/>
          </View>
        </View>
        {/* <Footer /> */}
      </ScrollView>
    </View>
  );
};

export default Shop;