import React, { useEffect, useState } from 'react';
import {  Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import UserAPI from '@api/user.api';
import { User } from '@/types/data.types';
import { Product } from '@/types/data.types';
import ProductAPI from '@/api/product.api';
import { formatPrice } from '@/utilities/formatter';

//Need a wrapper or something that calls this so I can do more complex features
// - Have a fake first row for create anything, where everything is placeholder and
//   as you start typing it highlights, and has a save icon or something at one end Ion: save
// Figure out auto option instead of flex 1 so things like description can take up more space
// Use hover thing from nav on whole row
// Navbar on side, dark color maybe black with white text and icons
// Better fonts

const TableHeader = ({labels} : {labels: string[]}) => {
  return (
      <View style={[styles.row, styles.rowHeader]}>
      { labels.map((label) => (
        (label != "options" && label != "select") ? (
        <View style={[styles.col, styles.headerElement]}>
          <Text style={styles.rowHeaderText}>{label}</Text>
          <Icon name="swap-vertical"
            size={20}
            color="#000000aa"
          />
        </View>
        ) : (
        <View style={[styles.col, styles.headerElement]}>
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
          { labels.map( (label) => (
            <View style={styles.col}>
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

const ListUsers = () => {
  const [users, setUser] = useState([{}] as [User]);

  useEffect(() => {
    UserAPI.getAll().then((res) => setUser(res.data));
  }, []);

  return (
    <View style={styles.section}>
      { users &&
      <FlatList
        data={users}
        renderItem={({item}) => <UserElement user={item} />}
        keyExtractor={(user: User) => user?._id}
        ListHeaderComponent={() => <UsersTableHeader labels={["select", "id", "name", "email", "role", "phone", "orders", "street", "city", "state", "zip", "country", "options"]}/>}
      />
      }
    </View>
  );
};

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductAPI.getAll().then((res) => setProducts(res.data));
  }, []);
  const [text, onChangeText] = useState('Search');
  return (
    <View style={styles.section}>
      <View style={styles.listFilters}>
        <Icon name="search-sharp"
                size={20}
                color="#000"
              />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
      { products &&
      <FlatList
        data={products}
        renderItem={({item}) => <ProductElement product={item} />}
        keyExtractor={(product: Product) => product?._id}
        ListHeaderComponent={() => <TableHeader labels={["select", "id", "name", "description", "category", "subcategory", "price", "images", "in stock", "options"]}/>}
      />
      }
    </View>
  );
};

//On platform web show the melting face emoji with text like Maybe just don't use admin on mobile right now. or sad-outline

export const Admin = () => {
    return (
      <View style={[styles.container]}>
        <View style={[styles.contentContainer]}>
          <View style={styles.topBar}>
          <TouchableOpacity style={styles.button}>
            <Icon name="moon"
                size={20}
                color="#000"
              />
          </TouchableOpacity>
            
          </View>
          <Text style={[styles.header]}>Admin</Text>
          <Text style={[styles.bodyText]}>
            This is the admin page.
          </Text>
          <ListUsers/>
          <ListProducts/>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: '.5rem',
    paddingVertical: '.5rem'
  },
  section: {
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
