import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, ImageBackground } from 'react-native';
import Layout from '@styles/layout/Layout';
// import BikeCards from '@components/ProductPage/Cards/BikeCards'
import { Search_Bar } from '@/components/ProductPage/searchBar';
import { ItemCard } from '@components/ProductPage/Cards/ItemCards';
import { Footer } from '@components/Footer';
import { FilterParams } from '@components/ProductPage/filter';
import { ListProducts } from '@components/ProductPage/Cards/BikeCards'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = () => {
  const price = (Math.random() * (1000 - 100 + 1) + 100).toFixed(2);
  return (
    <View style={styles.item}>
      <ImageBackground source={require("../../assets/Images/stolen_bike_image.jpg")} resizeMode="contain" style={styles.backgroundimage}>
      <View style={styles.priceBubble}>
        <Text style={styles.priceText}>${price}</Text>
      </View>
      <View style={styles.itemName}>
        <Text style={styles.itemNameText} numberOfLines={1}>Globe Hybrid Globe Hybrid Globe Hybrid</Text>
        <Text style={styles.itemStockText}>In Stock</Text>
      </View>
      <View style={styles.itemTray}>
        <View style={styles.colors}>
          <View style={styles.colorBox}></View>
          <View style={styles.colorBox}></View>
          <View style={styles.colorBox}></View>
        </View>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.btnFont}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
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
    backgroundColor: '#dee',
    gap: 30,
    padding: 30,
  },
  item: {
    width: 370,
    height: 370,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
    elevation: 10,
  },
  priceBubble: {
    backgroundColor: '#000',
    width: 110,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    position: 'relative',
    top: -25,
    left: -25,
  },
  priceText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
  },
  itemName: {
    flexDirection: 'column',
    position: 'relative',
    top: -60,
    left: 100,
    maxWidth: 370-120 
  },
  itemNameText: {
    fontSize: 30
  },
  itemStockText: {
    paddingHorizontal: 15,
    color: '#999',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  backgroundimage: {
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#42b66d',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnFont: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff',
  },
  itemTray: {
    width: "100%",
    position: 'relative',
    top: 180,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  }, 
  colors: {
    flexDirection: 'row',
    gap: 10,
  },
  colorBox: {
    width: 25,
    height: 25,
    backgroundColor: 'yellow',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
    elevation: 10,
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