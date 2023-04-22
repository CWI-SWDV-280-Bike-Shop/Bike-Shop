import React, { useEffect, useState } from 'react';
import {  Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import UserAPI from '@api/user.api';
import ProductAPI from '@/api/product.api';
import OrdersAPI from '@api/order.api';
import { Product, Order, User, OrderItem } from '@/types/data.types';
import { formatPrice } from '@/utilities/formatter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Need a wrapper or something that calls this so I can do more complex features
// Figure out auto option instead of flex 1 so things like description can take up more space
// Use hover thing from nav on whole row
// Better fonts

//One large object everything can reference so you don't have to go looking for stuff
const document = {
  routes: [
    {
      "route": "Users",
      "icon": "people-outline"
    },{
      "route": "Products",
      "icon": "pricetags-outline"
    },{
      "route": "Orders",
      "icon": "receipt-outline"
      }
  ]
}

const NavigationMenu = ({navigation}) => {
  const checkPage = (page) => { return (navigation.getState().routeNames[navigation.getState().index]==page) }
  return(
    <View style={styles.navigationMenu}>
      { document.routes.map( (item) => (
        <TouchableOpacity style={[styles.navbutton, (checkPage(item.route)) ? styles.active : styles.inactive]} onPressOut={() => navigation.navigate(item.route)}>
          <Icon name={item.icon}
              size={20}
              color="#fff"
            />
            <Text style={styles.textWhite}>{item.route}</Text>
        </TouchableOpacity>
      )) }
  </View>
  )
}

const TableHeader = ({labels} : {labels: string[]}) => {
  return (
      <View style={[styles.row, styles.rowHeader]}>
      { labels.map((label, i) => (
        (label != "options" && label != "select") ? (
        <View style={[styles.col, styles.headerElement]} key={i}>
          <Text style={styles.rowHeaderText}>{label}</Text>
          <Icon name="swap-vertical"
            size={20}
            color="#000000aa"
          />
        </View>
        ) : (
        <View style={[styles.col, styles.headerElement]} key={i}>
          <Text style={styles.rowHeaderText}>{label}</Text>
        </View>
        )
        )) }
    </View>
  )};

  {/* <View style={[styles.col]}><Text>ADD USER</Text></View>
        <View style={[styles.col]}><Text></Text></View>
        <View style={[styles.col, styles.createNew]}><Text>name</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>email</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>role</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>phone</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>orders</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>street</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>city</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>state</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>zip</Text></View>
        <View style={[styles.col, styles.createNew]}><Text>country</Text></View>
        <View style={[styles.col, {alignItems: 'center'}]}><Icon name="md-save"
              size={30}
              color="#000000aa"
            /></View>
      </View> */}

const UsersTableHeader = ({labels} : {labels: string[]}) => {    
    return (
      <View>
        <TableHeader labels={labels}/>
        <View style={styles.row}>
          { labels.map( (label, i) => (
            <View style={styles.col} key={i}>
              <TextInput style={styles.createNew} placeholder={label}/>
            </View>
          )) }
        </View>
      </View>
    )
}

const UserElement = ({user}: {user: User}) => (
  <View style={styles.row}>
    <View style={styles.col}>
      <Icon name="square-outline"
        size={20}
        color="#000"
      />
    </View>
    <View style={styles.col}><Text numberOfLines={1}>{user?._id}</Text></View>
    <View style={styles.col}><Text>{user?.name}</Text></View>
    <View style={styles.col}><Text>{user?.email}</Text></View>
    <View style={styles.col}><Text>{user?.role}</Text></View>
    <View style={styles.col}><Text>{user?.phone}</Text></View>
    <View style={styles.col}><Text>0</Text></View>
    <View style={styles.col}><Text>{user?.address?.street}</Text></View>
    <View style={styles.col}><Text>{user?.address?.city}</Text></View>
    <View style={styles.col}><Text>{user?.address?.state}</Text></View>
    <View style={styles.col}><Text>{user?.address?.zip}</Text></View>
    <View style={styles.col}><Text>{user?.address?.country}</Text></View>
    <View style={[styles.col, {alignItems: 'center'}]}>
      <Icon name="ellipsis-vertical"
        size={20}
        color="#000"
      />
    </View>
  </View>
);

const ProductElement = ({product}: {product: Product}) => (
  <View style={styles.row}>
    <View style={styles.col}>
      <Icon name="square-outline"
        size={20}
        color="#000"
      />
    </View>
    <View style={styles.col}><Text numberOfLines={1}>{product?._id}</Text></View>
    <View style={styles.col}><Text>{product?.name}</Text></View>
    <View style={styles.col}><Text numberOfLines={1}>{product?.description}</Text></View>
    <View style={styles.col}><Text>{product?.category}</Text></View>
    <View style={styles.col}><Text>{product?.subcategory}</Text></View>
    <View style={styles.col}><Text>{formatPrice(product?.price)}</Text></View>
    <View style={styles.col}><Text numberOfLines={1}>{product?.imageIds}</Text></View>
    <View style={styles.col}><Text>{product?.inStock}</Text></View>
    <View style={[styles.col, {alignItems: 'center'}]}>
      <Icon name="ellipsis-vertical"
        size={20}
        color="#000"
      />
    </View>
  </View>
);

//Typescript doesn't like type 'user | string' trying to access props, so I had to use any, Solomon can fix this I'm sure.
const OrderElement = ({order}: {order: any}) => (
  <View style={styles.row}>
    <View style={styles.col}>
      <Icon name="square-outline"
        size={20}
        color="#000"
      />
    </View>
    <View style={styles.col}><Text numberOfLines={1}>{order?._id}</Text></View>
    <View style={styles.col}><Text>{order?.customer?.name}</Text></View>
    <View style={styles.col}><Text numberOfLines={1}>{order?.createdAt}</Text></View>
    <View style={styles.col}><Text>{order?.items.length}</Text></View>
    <View style={styles.col}><Text>{formatPrice(order?.total)}</Text></View>
    <View style={styles.col}><Text>{order?.updatedAt}</Text></View>
    <View style={[styles.col, {alignItems: 'center'}]}>
      <Icon name="ellipsis-vertical"
        size={20}
        color="#000"
      />
    </View>
  </View>
);

const ListUsers = ({navigation}) => {
  const [users, setUser] = useState([{}] as [User]);

  useEffect(() => {
    UserAPI.getAll().then((res) => setUser(res.data));
  }, []);
  const [searchProductsText, _searchProductsText] = useState('Search');
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation}/>
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp"
                  size={20}
                  color="#000"
                />
          <TextInput
            style={styles.textInput}
            onChangeText={_searchProductsText}
            value={searchProductsText}
          />
        </View>
        { users &&
        <FlatList
          data={users}
          renderItem={({item, index}) => <UserElement user={item} key={index} />}
          keyExtractor={(user: User) => user?._id}
          ListHeaderComponent={() => <UsersTableHeader labels={["select", "id", "name", "email", "role", "phone", "orders", "street", "city", "state", "zip", "country", "options"]}/>}
        />
        }
      </View>
    </View>
    
  );
};

const ListProducts = ({navigation}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ProductAPI.getAll().then((res) => setProducts(res.data));
  }, []);
  const [searchUserText, _searchUserText] = useState('Search');
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation}/>
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp"
                  size={20}
                  color="#000"
                />
          <TextInput
            style={styles.textInput}
            onChangeText={_searchUserText}
            value={searchUserText}
          />
        </View>
        { products &&
        <FlatList
          data={products}
          renderItem={({item, index}) => <ProductElement product={item} key={index} />}
          keyExtractor={(product: Product) => product?._id}
          ListHeaderComponent={() => <TableHeader labels={["select", "id", "name", "description", "category", "subcategory", "price", "images", "in stock", "options"]}/>}
        />
        }
      </View>
    </View>
    
  );
};

const ListOrders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    OrdersAPI.getAll().then((res) => setOrders(res.data));
  }, []);
  const [searchOrderText, _searchOrderText] = useState('Search');
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation}/>
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp"
                  size={20}
                  color="#000"
                />
          <TextInput
            style={styles.textInput}
            onChangeText={_searchOrderText}
            value={searchOrderText}
          />
        </View>
        { orders &&
        <FlatList
          data={orders}
          renderItem={({item, index}) => <OrderElement order={item} key={index} />}
          keyExtractor={(order: Order) => order?._id}
          ListHeaderComponent={() => <TableHeader labels={["select", "id", "purchased by", "created at", "items", "total", "updated", "options"]}/>}
        />
        }
      </View>
    </View>
    
  );
};

//On platform web show the melting face emoji with text like Maybe just don't use admin on mobile right now. or sad-outline

export const Admin = () => {
  const Stack = createStackNavigator();
  function AdminPages() {
    return (
      <Stack.Navigator
      initialRouteName='Users'
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff', flex: 1 },
      }}>
        <Stack.Screen name="Users" component={ListUsers} />
        <Stack.Screen name="Products" component={ListProducts} />
        <Stack.Screen name="Orders" component={ListOrders} />
      </Stack.Navigator>
    );
  }
    return (
      <View style={[styles.container]}>
          {/* <View style={styles.topBar}>
          <TouchableOpacity style={styles.button}>
            <Icon name="moon"
                size={20}
                color="#000"
              />
          </TouchableOpacity>
          </View> */}
          <NavigationContainer independent={true}>
            <AdminPages/>
          </NavigationContainer>
      </View>
    );
};

const styles = StyleSheet.create({
  //Navigation Bar Styles
  active: {
    backgroundColor: '#ffffff33'
  },
  inactive: {
    backgroundColor: '#ffffff00',
  },
  navbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    gap: 5,
    width: '100%',
    fontSize: 20,
  },
  navigationMenu: {
    height: '100%',
    backgroundColor: '#000',
    flexDirection: 'column',
    paddingVertical: '1rem'
  },
  //Container Styles
  section: {
    flex: 1,
    flexDirection: 'column',
    borderTopColor: '#6a7b76',
    borderTopWidth: 10,
    margin: '2rem',
    padding: '1rem',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1
  },
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  //Generic Styles
  rowSimple: {
    flex: 1,
    flexDirection: 'row'
  },
  textWhite: {
    color: '#fff'
  },
  //Table Styles
  createNew: {
    borderStyle: 'dashed',
    borderColor: '#6a7b76cc',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD4f',
    padding: 10,
    borderRadius: 5,
  },
  listFilters: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 10,
    borderRadius: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '2rem'
  },
  rowHeader: {
    borderBottomColor: '#f0f1f1',
    borderBottomWidth: 3,
    marginBottom: '1rem',
    textTransform: 'uppercase',
  },
  rowHeaderText: {
    paddingHorizontal: 5,
    fontWeight: '700'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  headerElement: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  col: {
    flex: 1,
    padding: '.5rem'
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
});
