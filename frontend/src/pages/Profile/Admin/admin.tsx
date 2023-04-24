import React, { Dispatch, ReactComponentElement, SetStateAction, useEffect, useState } from 'react';
import {  Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity, ViewComponent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import UserAPI from '@api/user.api';
import ProductAPI from '@/api/product.api';
import OrdersAPI from '@api/order.api';
import { Product, Order, User, OrderItem } from '@/types/data.types';
import { formatPrice } from '@/utilities/formatter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, } from 'react-native-web-hover'
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';

// Search can be implemented like I did sorting, button needs selector for which field to search
// Need a wrapper or something that calls this so I can do more complex features
// Figure out auto option instead of flex 1 so things like description can take up more space
// Better fonts

//One large object everything can reference so you don't have to go looking for stuff
const document = {
  routes: [
    {
      "route": "Users",
      "icon": "people-outline",
      "component": ListUsers,
      "labels": ["select", "id", "name", "email", "role", "phone", "orders", "street", "city", "state", "zip", "country", "options"],
      "properties": ["", "_id", "name", "email", "role", "phone", "", "", "", "", "", "", ""]
    },{
      "route": "Products",
      "icon": "pricetags-outline",
      "component": ListProducts,
      "labels": ["select", "id", "name", "description", "category", "subcategory", "price", "images", "in stock", "options"],
      "properties": ["", "_id", "name", "description", "category", "subcategory", "price", "imageIds", "inStock", "",]
    },{
      "route": "Orders",
      "icon": "receipt-outline",
      "component": ListOrders,
      "labels": ["select", "id", "purchased by", "created at", "items", "total", "updated", "options"],
      "properties": ["", "_id", "customer", "createdAt", "items", "total", "updatedAt", "",]
      }
  ]
}

const NavigationMenu = ({navigation}) => {
  const checkPage = (page) => { return (navigation.getState().routeNames[navigation.getState().index]==page) }
  return(
    <View style={styles.navigationMenu}>
      { document.routes.map( (item, i) => (
        <TouchableOpacity key={i} style={[styles.navbutton, (checkPage(item.route)) ? styles.active : styles.inactive]} onPressOut={() => navigation.navigate(item.route)}>
          <Icon name={item.icon} size={20} color="#fff" />
          <Text style={styles.textWhite}>{item.route}</Text>
        </TouchableOpacity>
      )) }
  </View>
  )
}

const TableHeader = ({labels, properties, state} : {labels: string[], properties: string[], state?: [boolean, Dispatch<SetStateAction<boolean>>, string, Dispatch<SetStateAction<string>>]}) => {
  return (
      <View style={[styles.row, styles.rowHeader]}>
      { labels.map((label, i) => (
        (label != "options" && label != "select") ? (
        <View style={[styles.col, styles.headerElement]} key={i}>
          <Text style={styles.rowHeaderText}>{label}</Text>
          <TouchableOpacity onPressOut={() => {
            state[3](properties[i]);
            state[1](!state[0]);
            }}>
            <Icon name="swap-vertical"
              size={20}
              color="#000000aa"
            />
          </TouchableOpacity>
        </View>
        ) : (
        <View style={[styles.col, styles.headerElement]} key={i}>
          <Text style={styles.rowHeaderText}>{label}</Text>
        </View>
        )
        )) }
    </View>
  )};

  const Row = ({children} : {children? : Children}) => (
    <Pressable style={({ hovered }) => [hovered && styles.hoverOver]}>
      <View style={styles.row}>
        {children}
      </View>
    </Pressable>
  )
  
  const Column = ({overflow, children} : {overflow?: boolean, children?: Children}) => {
    return <View style={styles.col}><Text numberOfLines={(overflow) ? 10 : 1}>{children}</Text></View>
  }
  

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

const UsersTableHeader = ({labels, properties, state} : {labels: string[], properties: string[], state: [boolean, Dispatch<SetStateAction<boolean>>, string, Dispatch<SetStateAction<string>>]}) => {    
    return (
      <View>
        <TableHeader labels={labels} properties={properties} state={state}/>
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

const UserElement = ({user}: {user: User}) => {
  const [showPopover, setShowPopover] = useState(true);
  return (
  <Row>
    <View style={styles.col}>
      <Icon name="square-outline"
        size={20}
        color="#000"
      />
    </View>
    <Column>{user?._id}</Column>
    <Column>{user?.name}</Column>
    <Column>{user?.email}</Column>
    <Column>{user?.role}</Column>
    <Column>{user?.phone}</Column>
    <Column>0</Column>
    <Column>{user?.address?.street}</Column>
    <Column>{user?.address?.city}</Column>
    <Column>{user?.address?.state}</Column>
    <Column>{user?.address?.zip}</Column>
    <Column>{user?.address?.country}</Column>
    <View style={[styles.col, {alignItems: 'center'}]}>
    <Popover
      mode={PopoverMode.TOOLTIP}
      placement={PopoverPlacement.TOP}
      isVisible={showPopover}
      from={(
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <Icon name="ellipsis-vertical"
              size={20}
              color="#000"
            />
        </TouchableOpacity>
      )}>
      <>
        <Text>This is the contents of the popover</Text>
        <TouchableOpacity onPress={() => setShowPopover(false)}>
          <Text>Dismiss</Text>
        </TouchableOpacity>
      </>
    </Popover>
      {/* <Menu>
        <MenuTrigger>
        <Icon name="ellipsis-vertical"
          size={20}
          color="#000"
        />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu> */}
    </View>
  </Row>
)};

function ProductElement({product}: {product: Product}){
  
  return(
  <Row>
    <View style={styles.col}>
      <Icon name="square-outline"
        size={20}
        color="#000"
      />
    </View>
    <Column>{product?._id}</Column>
    <Column>{product?.name}</Column>
    <Column>{product?.description}</Column>
    <Column>{product?.category}</Column>
    <Column>{product?.subcategory}</Column>
    <Column>{formatPrice(product?.price)}</Column>
    <Column>{product?.imageIds}</Column>
    <Column>{product?.inStock}</Column>
    <View style={[styles.col, {alignItems: 'center'}]}>
      <Icon name="ellipsis-vertical"
        size={20}
        color="#000"
      />
    </View>
  </Row>
  )
}

const OrderElement = ({order}: {order: Order}) => (
  <Row>
    <View style={styles.col}>
      <Icon name="square-outline"
        size={20}
        color="#000"
      />
    </View>
    <Column>{order?._id}</Column>
    <Column>{typeof order?.customer === "string" ? order?.customer : order?.customer?.name}</Column>
    <Column>{order?.createdAt}</Column>
    <Column>{order?.items.length}</Column>
    <Column>{formatPrice(order?.total)}</Column>
    <Column>{order?.updatedAt}</Column>
    <View style={[styles.col, {alignItems: 'center'}]}>
      <Icon name="ellipsis-vertical"
        size={20}
        color="#000"
      />
    </View>
  </Row>
);

function ListUsers({navigation}) {
  const [users, setUser] = useState([{}] as [User]);
  const [asc, setAsc] = useState(true);
  const [field, setField] = useState("name");

  const sortData = (data) => {
    return data.sort((a, b) => (asc) ? b[field]?.localeCompare(a[field]) : a[field]?.localeCompare(b[field]));
  } 

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
          data={sortData(users)}
          renderItem={({item, index}) => <UserElement user={item} key={index} />}
          keyExtractor={(user: User) => user?._id}
          ListHeaderComponent={() => 
            <UsersTableHeader state={[asc, setAsc, field, setField]}
              labels={document.routes.find((e)=>e.route=="Users").labels}
              properties={document.routes.find((e)=>e.route=="Users").properties}/>}
        />
        }
      </View>
    </View>
  );
}

function ListProducts({navigation}) {
  const [products, setProducts] = useState([]);
  const [asc, setAsc] = useState(true);
  const [field, setField] = useState("name");

  const sortData = (data) => {
    return data.sort((a, b) => {
      try {
        return (asc) ? b[field].localeCompare(a[field]) : a[field].localeCompare(b[field]);
      } catch (error) {
        console.log(error);
        return data;
      }
    });
  } 

  useEffect(() => {
    ProductAPI.getAll().then((res) => setProducts(res.data));
  }, []);
  const [searchUserText, _searchUserText] = useState('Search');
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation}/>
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp" size={20} color="#000"/>
          <TextInput
            style={styles.textInput}
            onChangeText={_searchUserText}
            value={searchUserText}
          />
        </View>
        { products &&
        <FlatList
          data={sortData(products)}
          renderItem={({item, index}) => <ProductElement product={item} key={index} />}
          keyExtractor={(product: Product) => product?._id}
          ListHeaderComponent={() => <TableHeader state={[asc, setAsc, field, setField]}
            labels={document.routes.find((e)=>e.route=="Products").labels}
            properties={document.routes.find((e)=>e.route=="Products").properties}/>}
        />
        }
      </View>
    </View>
    
  );
}

function ListOrders ({navigation}) {
  const [orders, setOrders] = useState([]);
  const [asc, setAsc] = useState(true);
  const [field, setField] = useState("name");

  const sortData = (data) => {
    return data.sort((a, b) => {
      try {
        return (asc) ? b[field].localeCompare(a[field]) : a[field].localeCompare(b[field]);
      } catch (error) {
        console.log(error);
        return data;
      }
    });
  } 

  useEffect(() => {
    OrdersAPI.getAll().then((res) => setOrders(res.data));
  }, []);
  const [searchOrderText, _searchOrderText] = useState('Search');
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation}/>
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp" size={20} color="#000" />
          <TextInput
            style={styles.textInput}
            onChangeText={_searchOrderText}
            value={searchOrderText}
          />
        </View>
        { orders &&
        <FlatList
          data={sortData(orders)}
          renderItem={({item, index}) => <OrderElement order={item} key={index} />}
          keyExtractor={(order: Order) => order?._id}
          ListHeaderComponent={() => <TableHeader state={[asc, setAsc, field, setField]}
            labels={document.routes.find((e)=>e.route=="Orders").labels}
            properties={document.routes.find((e)=>e.route=="Orders").properties}/>}
        />
        }
      </View>
    </View>
    
  );
}

export const Admin = () => {
  const Stack = createStackNavigator();
  function AdminPages() {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff', flex: 1 },
      }}>
      { document.routes.map( (item, i) => <Stack.Screen name={item.route} key={i} component={item.component} /> ) }
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
  hoverOver: {
    backgroundColor: '#00000011',
  },
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
