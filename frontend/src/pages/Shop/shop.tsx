import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, ImageBackground, FlatList, ScaledSize } from 'react-native';
import Layout from '@styles/layout/Layout';
// import BikeCards from '@components/ProductPage/Cards/BikeCards'
import { Search_Bar } from '@/components/ProductPage/searchBar';
import { ItemCard } from '@components/ProductPage/Cards/ItemCards';
import { Footer } from '@components/Footer';
import { FilterParams } from '@components/ProductPage/filter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import ProductAPI from '@/api/product.api';
import { Product } from '@/types/data.types';
import Checkbox from 'expo-checkbox';
import { ShopContext } from '@/context/shop.context';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import Popover, { PopoverPlacement } from 'react-native-popover-view';

const Item = ({ product }: { product: Product }) => {
  //Patch to avoid Nicko's WIP Code
  //const addToCart = (product : Product) => {};
  const { addToCart } = useContext(ShopContext);
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
          <Text style={[styles.itemStockText, (product.inStock) ? styles.inStock : styles.outStock]} numberOfLines={1}>{(product.inStock) ? "In stock" : "Out of stock"}</Text>
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
          {
            (product.inStock) ? (
              <TouchableOpacity style={[styles.buttonRound, styles.offsetButton]} onPress={() => {
                addToCart(product)
              }}>
                <Icon name="cart-outline" size={40} color="#FFF" />
              </TouchableOpacity>
            ) : (<View></View>)
          }
      </View>
      </ImageBackground>
    </View>
  )
}

function ListProducts({state}) {
  const [products, setProducts] = useState([{}] as [Product]);
  useEffect(() => {
    console.dir(state.filterObject);
    ProductAPI.getAll(state.filterObject).then((res) => setProducts(res.data));
  }, [state.filterObject]);

  const sortData = (data) => {
    return data.sort((a, b) => {
      if(b[state.field] != undefined && a[state.field] != undefined) {
        return state.asc
          ? b[state.field] - a[state.field]
          : a[state.field] - b[state.field];
      }
    });
  };

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

const Filters = ({ filterState }) => {
  const state = filterState.state;
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    ProductAPI.getLabels().then((res) => setLabels(res.data));
  }, []);

  return (
    <View style={styles.toolbar}>
    <ScrollView>
      <Text style={styles.optionsMainText}>Filters</Text>
      {Object.keys(labels).map((label, i) => (
      <View style={styles.options} key={i}>
        <Text style={styles.optionsHeader}>{label}</Text>
        <View style={styles.optionSubheader}>
          {
            labels[label].map((value, i) => (
              <View style={styles.checkBoxRow} key={i}>
                <Checkbox value={filterState.checkMarks[value] || false} onValueChange={() => {
                  filterState.setCheckMarks({...filterState.checkMarks, [value] : !filterState.checkMarks[value]});
                  const filters = (!Object.keys(state.filterObject).includes(label)) ? {...state.filterObject, [label] : {$in : []}} : {...state.filterObject};
                  state.filterSet( 
                    (filters[label].$in.includes(value)) ?
                    {...filters, [label] : {$in : filters[label].$in.filter((e)=>e!=value)}}
                    : {...filters, [label] : {$in : [...filters[label].$in, value]}} );
                  }}/>
                <Text style={styles.optionsText}>{value}</Text>
              </View>
            ))
          }
        </View>
      </View>
    ))}
    </ScrollView>
  </View>
  )
}


export const Shop = ({dimensions} : {dimensions : ScaledSize}) => {
  const [asc, setAsc] = useState(true);
  const [sortfield, sortsetField] = useState("price");
  const [filterObject, filterSet] = useState({"category": {$in : ["Bikes"]}});
  const [checkMarks, setCheckMarks] = useState({"Bikes": true});

  const state = {
    asc: asc,
    setAsc: setAsc,
    field: sortfield,
    setField: sortsetField,
    filterObject: filterObject,
    filterSet: filterSet,
  }

  const filterState = {
    state: state,
    checkMarks: checkMarks,
    setCheckMarks: setCheckMarks,
  }

  const responsive = StyleSheet.create({
    /* Sort Styles */
    toolbar: {
      display: (254+700 < dimensions.width) ? 'flex' : 'none',
    },
    hideOnDesktop: {
      display: (254+700 > dimensions.width) ? 'flex' : 'none',
    },
  });

  return (
    <View style={styles.container}>
      <View style={responsive.toolbar}>
        <Filters filterState={filterState}/>
      </View>
    
      <ScrollView>
        <View style={styles.sortBar}>
          <ScrollView horizontal={true}>
          <View style={[styles.sortBarCol, responsive.hideOnDesktop]}>
            <OpenFilters filterState={filterState}/>
          </View>
          <View style={styles.sortBarCol}>
            <Text style={styles.sortTextHeader}>Sort Options: </Text>
          </View>
          <View style={styles.sortBarCol}>
            <Text style={styles.sortText}>Price</Text>
            <TouchableOpacity style={styles.sortBtn}
              onPressOut={() => {
                if(sortfield == "price") setAsc(!asc); 
                else sortsetField("price");
              }}
            >
              <Icon name="swap-vertical" size={20} color="#000000aa" />
            </TouchableOpacity>
          </View>
          <View style={styles.sortBarCol}>
            <Text style={styles.sortText}>In Stock</Text>
            <TouchableOpacity style={styles.sortBtn}
              onPressOut={() => {
                if(sortfield == "inStock") setAsc(!asc); 
                else sortsetField("inStock");
              }}
            >
              <Icon name="swap-vertical" size={20} color="#000000aa" />
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
          <ListProducts state={state}/>
      </ScrollView>
    </View>
  );
};

const OpenFilters = ({ filterState }) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
      placement={PopoverPlacement.FLOATING}
      from={
        <TouchableOpacity style={styles.filterShowBtn} onPress={() => setShowPopover(!showPopover)}>
          <Text style={styles.filterShowText}>FILTERS</Text>
        </TouchableOpacity>
      }
    >
      <FilterPopup setShowPopover={setShowPopover} filterState={filterState} />
    </Popover>
  )
}

const FilterPopup = ({ setShowPopover, filterState }) => {
  return (
    <View style={styles.popoverLarge}>
      <Filters filterState={filterState} />
    </View>
  )
}

export default Shop;

const styles = StyleSheet.create({
  popoverLarge: {
    width: 300,
  },
  /* Sort Styles */
  sortBtn: {
    backgroundColor: '#00000030',
    padding: 5,
    borderRadius: 5,
  },
  sortBar: {
    backgroundColor: '#dee',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  sortText: {
    paddingHorizontal: 5,
    fontWeight: "700",
  },
  sortTextHeader: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontWeight: "700",
  },
  sortBarCol: {
    flexDirection: "row",
    alignItems: "center",
    padding: ".5rem",
  },
  filterShowBtn: {
    backgroundColor: '#3e6259',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  filterShowText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
    paddingHorizontal: 5,
    fontWeight: "700",
  },
  /* Filter Styles */
  optionsMainText: {
    marginVertical: 20,
    fontSize: 36,
  },
  options: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#00000020',
    paddingVertical: 15,
  },
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
  checkBoxRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 5,
    textAlignVertical: 'center',
  },
  /* Main Styles */
  inStock: {
    color: '#558c55'
  },
  outStock: {
    color: 'tomato'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff00',
  },
  toolbar: {
    width: 'auto',
    padding: 20,
    backgroundColor: '#dee',
    gap: 10,
  },
  products: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#dee',
    padding: 10,
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
    fontSize: 16,
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