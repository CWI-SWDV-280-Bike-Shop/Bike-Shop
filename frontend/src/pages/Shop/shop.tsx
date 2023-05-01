import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, ImageBackground, FlatList } from 'react-native';
import Layout from '@styles/layout/Layout';
// import BikeCards from '@components/ProductPage/Cards/BikeCards'
import { Search_Bar } from '@/components/ProductPage/searchBar';
import { ItemCard } from '@components/ProductPage/Cards/ItemCards';
import { Footer } from '@components/Footer';
import { FilterParams } from '@components/ProductPage/filter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import ProductAPI from '@/api/product.api';
import { Product } from '@/types/data.types';

const Item = ({ product }: { product: Product }) => {
  //const price = (Math.random() * (1000 - 100 + 1) + 100).toFixed(2);
  const price = product.price;
  const color = () => ["tomato", "cornflowerblue", "beige", "brown", "brickred"][Math.floor(Math.random() * 5)];
  return (
    <View style={styles.item}>
      <ImageBackground source={require("../../assets/Images/stolen_bike_image.jpg")} resizeMode="contain" style={styles.backgroundimage}>
      <View style={styles.priceBubble}>
        <Text style={styles.priceText} numberOfLines={1}>${price}</Text>
      </View>
      <View style={styles.itemName}>
        <Text style={styles.itemNameText} numberOfLines={1}>{product.name}</Text>
        <View style={styles.subheader}>
          <Text style={styles.itemStockText} numberOfLines={1}>{(product.inStock) ? "In stock" : "Out of stock"}</Text>
          {(product.subcategory) ? (
            <View style={styles.tag}>
              <Text style={styles.tagText} numberOfLines={1}>{product.subcategory}</Text>
            </View>
           ) : (<View></View>)}
        </View>
      </View>
      <View style={styles.itemTray}>
          {(product.category == "Bike" || product.category == "Bikes") ? (
            <View style={styles.colors}>
              <View style={[styles.colorBox, {backgroundColor: color()}]}></View>
              <View style={[styles.colorBox, {backgroundColor: color()}]}></View>
              <View style={[styles.colorBox, {backgroundColor: color()}]}></View>
            </View>
          ): (<View></View>)}
        <TouchableOpacity style={[styles.buttonRound, styles.offsetButton]}>
          <Icon name="cart-outline" size={40} color="#FFF" />
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  )
}

function ListProducts() {
  const [products, setProducts] = useState([]);
  const [asc, setAsc] = useState(true);
  const [field, setField] = useState("name");

  const sortData = (data) => {
    return data.sort((a, b) => {
      if(b[field] != undefined && a[field] != undefined) {
        return asc
          ? b[field].localeCompare(a[field])
          : a[field].localeCompare(b[field]);
      }
    });
  };

  useEffect(() => {
    ProductAPI.getAll().then((res) => setProducts(res.data));
  }, []);
  return (
    <View style={styles.products}>
        {products && (
          <FlatList
            data={sortData(products)}
            initialNumToRender={10}
            numColumns={4}
            renderItem={({ item, index }) => (
              <Item product={item} key={index} />
            )}
            keyExtractor={(product: Product) => product?._id}
          />
        )}
    </View>
  );
}


export const Shop = () => {
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    ProductAPI.getLabels().then((res) => setLabels(res.data));
  }, []);
  console.log(labels);
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
          {Object.keys(labels).map((label, i) => (
          <View key={i}>
            <Text style={styles.optionsHeader}>{label}</Text>
            <View style={styles.optionSubheader}>
              {
                labels[label].map((value, i) => (
                  <Text style={styles.optionsText}>{value}</Text>
                ))
              }
            </View>
          </View>
        ))}
        </View>
      <ScrollView>
          <ListProducts/>
      </ScrollView>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  /* Filter Styles */
  optionsHeader: {
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  optionSubheader: {
    paddingVertical: 10,
    gap: 10,
  },
  optionsText: {

  },
  /* Main Styles */
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff00',
  },
  toolbar: {
    width: 'auto',
    padding: 40,
    backgroundColor: '#dee',
    gap: 10,
  },
  products: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#dee',
    padding: 30,
  },
  item: {
    margin: 15,
    width: 390,
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
    paddingHorizontal: 10,
    color: '#999',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tag: {
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: '#999'
  },
  tagText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 14,
    maxWidth: 150
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
  buttonRound: {
    backgroundColor: '#42b66d',
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.52,
    shadowRadius: 2.22,
    elevation: 10,
  },
  btnFont: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff',
  },
  itemTray: {
    width: "100%",
    position: 'relative',
    top: 170,
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
  },
  offsetButton: {
    position: 'relative',
    top: 5,
    left: 30,
  },
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