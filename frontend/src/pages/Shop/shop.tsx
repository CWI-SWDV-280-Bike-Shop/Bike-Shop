import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Layout from '@styles/layout/Layout';
// import BikeCards from '@components/ProductPage/Cards/BikeCards'
import { Search_Bar } from '@/components/ProductPage/searchBar';
import { ItemCard } from '@components/ProductPage/Cards/ItemCards';
import { Footer } from '@components/Footer';
import { FilterParams } from '@components/ProductPage/filter';
import { ListProducts } from '@components/ProductPage/Cards/BikeCards'

const Item = () => {
  const price = (Math.random() * (1000 - 100 + 1) + 100).toFixed(2);
  return (
    <View style={styles.item}>
      <View style={styles.priceBubble}>
        <Text style={styles.priceText}>${price}</Text>
      </View>
    </View>
  )
}

export const Shop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
          <Text>OPTIONS</Text>
          <Text>OPTIONS</Text>
          <Text>OPTIONS</Text>
          <Text>OPTIONS</Text>
        </View>
      <ScrollView>
        <View style={styles.products}>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
        </View>
      </ScrollView>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'salmon',
  },
  toolbar: {
    width: 'auto',
    paddingHorizontal: 40,
    backgroundColor: 'cornflowerblue',
  },
  products: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'magenta',
    gap: 30,
    padding: 30,
  },
  item: {
    width: 370,
    height: 370,
    padding: 10,
    backgroundColor: 'tomato',
  },
  priceBubble: {
    backgroundColor: '#000',
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 100,
    position: 'relative',
    top: -25,
    left: -25,
  },
  priceText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
  }
})

/*   <View style={[Layout.searchFilter]}>
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
  </View> */