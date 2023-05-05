import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  ScaledSize,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState } from 'react';
import ProductAPI from '@/api/product.api';
import { Product } from '@/types/data.types';
import Checkbox from 'expo-checkbox';
import { ShopContext } from '@/context/shop.context';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Route, RouteProp } from '@react-navigation/native';

type ItemFull = {
  product: Product;
  dimensions: ScaledSize;
  setShowPopover: React.Dispatch<React.SetStateAction<boolean>>;
  productColors: {
    Red: string;
    Orange: string;
    Yellow: string;
    Green: string;
    Blue: string;
    Purple: string;
    Black: string;
    White: string;
    Grey: string;
    Pink: string;
  };
};

const ItemDetailsPopup = ({
  product,
  dimensions,
  setShowPopover,
  productColors,
}: ItemFull) => {
  const { addToCart } = useContext(ShopContext);
  const productRating = (price) => {
    const rating =
      price > 3000
        ? 5
        : price > 1000
        ? 4.5
        : price > 500
        ? 4
        : price > 200
        ? 3.5
        : price > 50
        ? 3
        : Math.round((Math.random() * 3) / 0.5) * 0.5;
    //const rating = Math.round((Math.random() * 6)/.5)*.5;
    const wholeStars = Array(Math.floor(rating)).fill({});
    const partialStars = rating % 1 > 0 ? Array(1).fill({}) : [];
    const emptyStars = Array(5 - Math.floor(rating) - partialStars.length).fill(
      {}
    );
    [].fill(1, 0);
    console.log(wholeStars, partialStars, emptyStars);
    return (
      <View style={details.rating}>
        {wholeStars.map((e, i) => (
          <Icon key={i} name={'star'} color={'gold'} size={22} />
        ))}
        {partialStars.map((e, i) => (
          <Icon key={i} name={'star-half'} color={'gold'} size={22} />
        ))}
        {emptyStars.map((e, i) => (
          <Icon key={i} name={'star-outline'} color={'gold'} size={22} />
        ))}
      </View>
    );
  };
  const details = StyleSheet.create({
    popover: {
      flexDirection: 254 + 700 > dimensions.width ? 'column' : 'row',
      flex: 1,
    },
    picture: {
      width: 400,
      height: 400,
      margin: 10,
    },
    info: {
      width: 300,
      padding: 20,
      flexDirection: 'column',
      flex: 1,
      gap: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
    },
    brand: {
      fontSize: 16,
    },
    price: {
      fontWeight: '800',
      fontSize: 16,
    },
    label: {
      fontSize: 14,
    },
    rating: {
      flexDirection: 'row',
    },
    addCartBtn: {
      flexDirection: 'row',
      padding: 5,
      backgroundColor: '#42B66D',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    addCartBtnText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700',
    },
    icons: {
      flexDirection: 'row',
      padding: 5,
      gap: 10,
    },
  });
  return (
    <View style={[details.popover]}>
      <View style={details.picture}>
        <ImageBackground
          source={require('../../assets/Images/stolen_bike_image.jpg')}
          resizeMode="contain"
          style={styles.backgroundimage}
        >
          <TouchableOpacity
            onPress={() => {
              setShowPopover(false);
            }}
          >
            <Icon name="close" size={30} color="#000" />
          </TouchableOpacity>
          <Text
            style={[
              styles.itemStockText,
              product.inStock ? styles.inStock : styles.outStock,
            ]}
            numberOfLines={1}
          >
            {product.inStock ? 'In stock' : 'Out of stock'}
          </Text>
        </ImageBackground>
      </View>
      <View style={details.info}>
        <Text style={details.brand}>{product.brand}</Text>
        <Text style={details.name}>{product.name}</Text>
        {productRating(product.price)}
        <Text style={details.price}>
          {product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Text>
        <Text>{product.description}</Text>
        {product.size ? (
          <Text style={details.label}>Size: {product.size}</Text>
        ) : (
          <></>
        )}
        {product.category ? <Text>Category: {product.category}</Text> : <></>}
        {product.subcategory ? (
          <Text>Subcategory: {product.subcategory}</Text>
        ) : (
          <></>
        )}
        {product.material ? <Text>Material: {product.material}</Text> : <></>}
        {product.wheelSize ? (
          <Text>Wheel Size: {product.wheelSize}</Text>
        ) : (
          <></>
        )}
        {product.color ? (
          <View style={details.icons}>
            <View style={styles.colors}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: productColors[product.color] },
                ]}
              ></View>
            </View>
          </View>
        ) : (
          <></>
        )}
        {product.inStock ? (
          <TouchableOpacity
            style={details.addCartBtn}
            onPress={() => {
              addToCart(product);
              setShowPopover(false);
            }}
          >
            <Text style={details.addCartBtnText}>Add to cart</Text>
            <Icon name="cart-outline" size={30} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const Item = ({
  product,
  dimensions,
}: {
  product: Product;
  dimensions: ScaledSize;
}) => {
  const [showPopover, setShowPopover] = useState(false);
  //const { addToCart } = useContext(ShopContext);
  const price = product.price;
  const productColors = {
    Red: 'tomato',
    Orange: 'orange',
    Yellow: 'gold',
    Green: 'lightgreen',
    Blue: 'cornflowerblue',
    Purple: 'purple',
    Black: 'black',
    White: 'white',
    Grey: 'gray',
    Pink: 'pink',
  };
  //const color = () => ["tomato", "cornflowerblue", "beige", "brown", "brickred"][Math.floor(Math.random() * 5)];
  return (
    <Popover
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
      placement={
        254 + 700 > dimensions.width
          ? PopoverPlacement.AUTO
          : PopoverPlacement.FLOATING
      }
      from={
        <TouchableOpacity onPress={() => setShowPopover(!showPopover)}>
          <View style={styles.item}>
            <ImageBackground
              source={require('../../assets/Images/stolen_bike_image.jpg')}
              resizeMode="contain"
              style={styles.backgroundimage}
            >
              <View style={styles.priceBubble}>
                <Text style={styles.priceText} numberOfLines={1}>
                  {price
                    ? price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : '$' + price}
                </Text>
              </View>
              <View style={styles.itemName}>
                <Text style={styles.itemNameText} numberOfLines={1}>
                  {product.name}
                </Text>
                <View style={styles.subheader}>
                  <Text
                    style={[
                      styles.itemStockText,
                      product.inStock ? styles.inStock : styles.outStock,
                    ]}
                    numberOfLines={1}
                  >
                    {product.inStock ? 'In stock' : 'Out of stock'}
                  </Text>
                  {product.subcategory ? (
                    <View style={styles.tag}>
                      <Text style={styles.tagText} numberOfLines={1}>
                        {product.subcategory}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
              <View style={styles.itemTray}>
                {product.category == 'Bike' ||
                (product.category == 'Bikes' && product.color) ? (
                  <View style={styles.colors}>
                    <View
                      style={[
                        styles.colorBox,
                        { backgroundColor: productColors[product.color] },
                      ]}
                    ></View>
                  </View>
                ) : (
                  <View></View>
                )}
                {/* {
            (product.inStock) ? (
              <TouchableOpacity style={[styles.buttonRound, styles.offsetButton]} onPress={() => {
                addToCart(product)
              }}>
                <Icon name="cart-outline" size={40} color="#FFF" />
              </TouchableOpacity>
            ) : (<View></View>)
          } */}
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      }
    >
      <ItemDetailsPopup
        product={product}
        dimensions={dimensions}
        setShowPopover={setShowPopover}
        productColors={productColors}
      />
    </Popover>
  );
};

function ListProducts({ state, dimensions }) {
  const [products, setProducts] = useState([{}] as [Product]);
  useEffect(() => {
    console.dir(state.filterObject);
    ProductAPI.getAll(state.filterObject).then((res) => setProducts(res.data));
  }, [state.filterObject]);

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (b[state.field] != undefined && a[state.field] != undefined) {
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
            <Item product={item} key={index} dimensions={dimensions} />
          )}
          keyExtractor={(product: Product) => product?._id}
        />
      )}
    </View>
  );
}

const Filters = (props) => {
  const { filterState } = props;
  const state = props.filterState.state;
  const [labels, setLabels] = useState([]);
  const [accordian, setAccordian] = useState({});
  useEffect(() => {
    ProductAPI.getLabels().then((res) => setLabels(res.data));
  }, []);

  return (
    <View style={styles.toolbar}>
      <ScrollView>
        <Text style={styles.optionsMainText}>Filters</Text>
        {Object.keys(labels).map((label, i) => (
          <View style={styles.options} key={i}>
            <TouchableOpacity
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              onPress={() => {
                254 + 700 > props.dimensions.width
                  ? setAccordian({
                      ...Object.fromEntries(
                        Object.entries(accordian).map(([k, v]) => [k, false])
                      ),
                      [label]: !accordian[label],
                    })
                  : setAccordian({ ...accordian, [label]: !accordian[label] });
              }}
            >
              <Text style={styles.optionsHeader}>{label}</Text>
              {accordian[label] ? (
                <Icon name="chevron-up" size={18} />
              ) : (
                <Icon name="chevron-down" size={18} />
              )}
            </TouchableOpacity>
            <View style={styles.optionSubheader}>
              {labels[label].map((value, i) => (
                <View
                  style={[
                    styles.checkBoxRow,
                    { display: accordian[label] ? 'flex' : 'none' },
                  ]}
                  key={i}
                >
                  <Checkbox
                    value={filterState.checkMarks[value] || false}
                    onValueChange={() => {
                      filterState.setCheckMarks({
                        ...filterState.checkMarks,
                        [value]: !filterState.checkMarks[value],
                      });
                      const filters = !Object.keys(state.filterObject).includes(
                        label
                      )
                        ? { ...state.filterObject, [label]: { $in: [] } }
                        : { ...state.filterObject };
                      state.filterSet(
                        filters[label].$in.includes(value)
                          ? {
                              ...filters,
                              [label]: {
                                $in: filters[label].$in.filter(
                                  (e) => e != value
                                ),
                              },
                            }
                          : {
                              ...filters,
                              [label]: { $in: [...filters[label].$in, value] },
                            }
                      );
                    }}
                  />
                  <Text style={styles.optionsText}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export const Shop = ({
  dimensions,
  navigation,
  route,
}: {
  dimensions: ScaledSize;
  navigation: any;
  route: any;
}) => {
  console.log(route.params);
  const [asc, setAsc] = useState(true);
  const [sortfield, sortsetField] = useState('price');
  type MongoQuery<T> = {
    [K in keyof T]: T[K] | { $in: T[K][] } | { $regex: string };
  };

  const [filterObject, filterSet] = useState<MongoQuery<Product>>({
    category: { $in: ['Bikes'] },
  });
  const [checkMarks, setCheckMarks] = useState({ Bikes: true });

  if (route.params) {
    useEffect(() => {
      filterSet({ [route.params.filter]: { $in: [route.params.value] } });
    }, [route.params]);
  }

  /* useEffect(() => {
    navigation.setParams({
      filter: '',
      value: ''
    });
  }, [filterObject]); */

  const state = {
    asc: asc,
    setAsc: setAsc,
    field: sortfield,
    setField: sortsetField,
    filterObject: filterObject,
    filterSet: filterSet,
  };

  const filterState = {
    state: state,
    checkMarks: checkMarks,
    setCheckMarks: setCheckMarks,
  };

  const responsive = StyleSheet.create({
    /* Sort Styles */
    toolbar: {
      display: 254 + 700 < dimensions.width ? 'flex' : 'none',
    },
    hideOnDesktop: {
      display: 254 + 700 > dimensions.width ? 'flex' : 'none',
    },
  });

  const [searchText, setSearchText] = useState('');
  const searchFunc = (text) => {
    setSearchText(text);
    filterSet({ ...state.filterObject, name: { $regex: text } });
  };
  return (
    <View style={styles.container}>
      <View style={responsive.toolbar}>
        <Filters filterState={filterState} dimensions={dimensions} />
      </View>

      <View style={{ flexDirection: 'column' }}>
        <View style={styles.sortBar}>
          <ScrollView horizontal={true}>
            <View style={[styles.sortBarCol, responsive.hideOnDesktop]}>
              <OpenFilters filterState={filterState} dimensions={dimensions} />
            </View>
            <View style={styles.sortBarCol}>
              <Text style={styles.sortTextHeader}>Sort Options: </Text>
            </View>
            <View style={styles.sortBarCol}>
              <Text style={styles.sortText}>Price</Text>
              <TouchableOpacity
                style={styles.sortBtn}
                onPressOut={() => {
                  if (sortfield == 'price') setAsc(!asc);
                  else sortsetField('price');
                }}
              >
                <Icon name="swap-vertical" size={20} color="#000000aa" />
              </TouchableOpacity>
            </View>
            <View style={styles.sortBarCol}>
              <Text style={styles.sortText}>In Stock</Text>
              <TouchableOpacity
                style={styles.sortBtn}
                onPressOut={() => {
                  if (sortfield == 'inStock') setAsc(!asc);
                  else sortsetField('inStock');
                }}
              >
                <Icon name="swap-vertical" size={20} color="#000000aa" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
              <Icon name="search-sharp" size={30} color="#000" />
              <TextInput
                style={styles.textInput}
                onChangeText={searchFunc}
                value={searchText}
                placeholder="Search"
              />
            </View>
          </ScrollView>
        </View>
        <ListProducts state={state} dimensions={dimensions} />
      </View>
    </View>
  );
};

const OpenFilters = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
      placement={PopoverPlacement.FLOATING}
      from={
        <TouchableOpacity
          style={styles.filterShowBtn}
          onPress={() => setShowPopover(!showPopover)}
        >
          <Text style={styles.filterShowText}>FILTERS</Text>
        </TouchableOpacity>
      }
    >
      <FilterPopup {...props} />
    </Popover>
  );
};

const FilterPopup = (props) => {
  return (
    <View style={styles.popoverLarge}>
      <ScrollView>
        <Filters {...props} />
      </ScrollView>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    borderColor: '#343',
    color: '#343',
    padding: 10,
    borderRadius: 20,
  },
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
    paddingHorizontal: 20,
  },
  sortText: {
    paddingHorizontal: 5,
    fontWeight: '700',
  },
  sortTextHeader: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontWeight: '700',
  },
  sortBarCol: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    fontWeight: '700',
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
  optionsText: {},
  checkBoxRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 5,
    textAlignVertical: 'center',
  },
  /* Main Styles */
  inStock: {
    color: '#558c55',
  },
  outStock: {
    color: 'tomato',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#dee',
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
    margin: 10,
    width: 350,
    height: 370,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
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
    padding: 10,
    paddingTop: 15,
    borderRadius: 10,
    position: 'relative',
    top: -20,
    left: -20,
  },
  priceText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  itemName: {
    flexDirection: 'column',
    position: 'relative',
    top: -40,
    left: 100,
    maxWidth: 350 - 120,
  },
  itemNameText: {
    fontSize: 30,
  },
  itemStockText: {
    paddingHorizontal: 10,
    color: '#999',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: '#999',
  },
  tagText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 14,
    maxWidth: 150,
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
    shadowColor: '#000',
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
    width: '100%',
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
    shadowColor: '#000',
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
});
