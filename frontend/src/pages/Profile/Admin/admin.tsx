import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import UserAPI from "@api/user.api";
import ProductAPI from "@/api/product.api";
import OrdersAPI from "@api/order.api";
import { Product, Order, User, OrderItem } from "@/types/data.types";
import { formatPrice } from "@/utilities/formatter";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native-web-hover";
import Popover from "react-native-popover-view";
import { ScaledSize } from 'react-native';
import { AuthContext } from "@/context/auth.context";
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';

// Search can be implemented like I did sorting, button needs selector for which field to search
// Need a wrapper or something that calls this so I can do more complex features
// Figure out auto option instead of flex 1 so things like description can take up more space
// Better fonts

//One large object everything can reference so you don't have to go looking for stuff
const document = {
  routes: [
    {
      route: "Users",
      icon: "people-outline",
      component: ListUsers,
      labels: [
        "select",
        "id",
        "name",
        "email",
        "role",
        "phone",
        "orders",
        "street",
        "city",
        "state",
        "zip",
        "country",
        "options",
      ],
      properties: [
        "",
        "_id",
        "name",
        "email",
        "role",
        "phone",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
    },
    {
      route: "Products",
      icon: "pricetags-outline",
      component: ListProducts,
      labels: [
        "select",
        "id",
        "name",
        "description",
        "category",
        "subcategory",
        "price",
        "images",
        "in stock",
        "options",
      ],
      properties: [
        "",
        "_id",
        "name",
        "description",
        "category",
        "subcategory",
        "price",
        "imageIds",
        "inStock",
        "",
      ],
    },
    {
      route: "Orders",
      icon: "receipt-outline",
      component: ListOrders,
      labels: [
        "select",
        "id",
        "purchased by",
        "created at",
        "items",
        "total",
        "updated",
        "options",
      ],
      properties: [
        "",
        "_id",
        "customer",
        "createdAt",
        "items",
        "total",
        "updatedAt",
        "",
      ],
    },
  ],
};

type UserState = {
  asc?: boolean,
  setAsc?: Dispatch<SetStateAction<boolean>>,
  field?: string,
  setField?: Dispatch<SetStateAction<string>>,
  users?: User[],
  setUser?: React.Dispatch<React.SetStateAction<User[]>>
  selectedRows?: string[]
  setSelectedRows?: React.Dispatch<React.SetStateAction<string[]>>
}

type ProductState = {
  asc?: boolean,
  setAsc?: Dispatch<SetStateAction<boolean>>,
  field?: string,
  setField?: Dispatch<SetStateAction<string>>,
  products?: Product[],
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>
  selectedRows?: string[]
  setSelectedRows?: React.Dispatch<React.SetStateAction<string[]>>
}

const NavigationMenu = ({ navigation }) => {
  const checkPage = (page) => {
    return (
      navigation.getState().routeNames[navigation.getState().index] == page
    );
  };
  return (
    <View style={styles.navigationMenu}>
      {document.routes.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.navbutton,
            checkPage(item.route) ? styles.active : styles.inactive,
          ]}
          onPressOut={() => navigation.navigate(item.route)}
        >
          <Icon name={item.icon} size={20} color="#fff" />
          <Text style={styles.textWhite}>{item.route}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TableHeader = ({
  labels,
  properties,
  state,
}: {
  labels: string[];
  properties: string[];
  state?: UserState;
}) => {
  return (
    <View style={[styles.row, styles.rowHeader]}>
      {labels.map((label, i) =>
        label != "options" && label != "select" ? (
          <Column header={true} key={i} width={(label === "id" || label === "orders") ? 80 : 150}>
            <Text style={styles.rowHeaderText}>{label}</Text>
            <TouchableOpacity
              onPressOut={() => {
                state.setField(properties[i]);
                state.setAsc(!state.asc);
              }}
            >
              <Icon name="swap-vertical" size={20} color="#000000aa" />
            </TouchableOpacity>
          </Column>
        ) : (
          <Column header={true} width={50} key={i}>
            <Text style={styles.rowHeaderText}>{label}</Text>
          </Column>
        )
      )}
    </View>
  );
};

const Row = ({ children }: { children?: Children }) => (
  <Pressable style={({ hovered }) => [hovered && styles.hoverOver]}>
    <View style={styles.row}>{children}</View>
  </Pressable>
);

const Column = ({ overflow, width = 150, header, children }: { overflow?: boolean; width?: number; header?: boolean; children?: Children; }) => {
  return (
    <View style={[styles.col, { width: width }, (header) ? styles.headerElement : {}]}>
      <Text numberOfLines={overflow ? 10 : 1}>{children}</Text>
    </View>
  );
};

const UsersTableHeader = ({
  labels,
  properties,
  state,
}: {
  labels: string[];
  properties: string[];
  state: UserState;
}) => {
  const [newUserForm, setUserForm] = useState({
    "name": "",
    "email": "",
    "role": "",
    "phone": "",
    "street": "",
    "city": "",
    "state": "",
    "zip": "",
    "country": "",
  })
  const createNewUser = ({ state }: { state: UserState }) => {
    const user: User = {
      name: newUserForm.name,
      email: newUserForm.email,
      password: 'DEFAULT',
      role: newUserForm.role,
      phone: newUserForm.phone,
      address: {
        street: newUserForm.street,
        city: newUserForm.city,
        state: newUserForm.state,
        zip: newUserForm.zip,
        country: newUserForm.country,
      }
    }
    UserAPI.create(user).then((res) => {
      console.log("User created: ", res);
      if (res.status == 200) {
        user._id = res.data._id;
        state.setUser([...state.users, user])
      }
    });
  }
  return (
    <View>
      <TableHeader labels={labels} properties={properties} state={state} />
      <View style={styles.row}>
        {
          labels.map((label, i) => (
            (label === "select") ?
              <Column width={50} key={i}></Column> :
              (label === "id" || label === "orders") ?
                <Column key={i} width={80}></Column> :
                (label === "options") ?
                  <Column width={50} key={i}>
                    <TouchableOpacity onPress={() => createNewUser({ state })}>
                      <View style={[styles.col]}>
                        <Icon name="md-save" size={30} color="#000000aa" />
                      </View>
                    </TouchableOpacity>
                  </Column>
                  :
                  <Column key={i}>
                    <TextInput style={styles.createNew} placeholder={label} value={newUserForm[label]} onChangeText={(text) => {
                      setUserForm({ ...newUserForm, [label]: text });
                    }} />
                  </Column>
          ))
        }
      </View>
    </View>
  );
};

const ProductsTableHeader = ({
  labels,
  properties,
  state,
}: {
  labels: string[];
  properties: string[];
  state: ProductState;
}) => {
  const categories = {
    Bikes: {
      subCategories: ['Electric', 'Mountain', 'Street'],
    },
    Accessories: {
      subCategories: ['Tires',
        'Brakes',
        'Lights',
        'Frames',
        'Chains',
        'Pedals',
        'Tubes',],
    },
    Services: {
      subCategories: ['Tune',
        'Wheel and Tire Maintenance',
        'Assembly',
        'Shifting and Brakes'],
    },
  };

  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(false);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSubcategory('');
  };

  const handleSubCategoryChange = (value: string) => {
    setSubcategory(value);
  };

  const createNewProduct = ({ state }: { state: ProductState }) => {
    const product: Product = {
      name,
      description,
      category,
      subcategory,
      price,
      inStock,
    }
    ProductAPI.create(product).then((res) => {
      console.log("Product created: ", res);
      if (res.status == 200) {
        state.setProducts([...state.products, product])
      }
    });
  }

  return (
    <View>
      <Row>
        <TextInput style={styles.createNew}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput style={styles.createNew}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View>
          <Text>Category:</Text>
          <Picker style={styles.createNew}
            selectedValue={category}
            onValueChange={handleCategoryChange}
          >
            <Picker.Item label="Select a category" value="" />
            {Object.keys(categories).map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
        {category && categories[category] && (
          <View>
            <Text>Subcategory:</Text>
            <Picker style={styles.createNew}
              selectedValue={subcategory}
              onValueChange={handleSubCategoryChange}
            >
              <Picker.Item label="Select a subcategory" value="" />
              {categories[category].subCategories.map((subCategory) => (
                <Picker.Item
                  key={subCategory}
                  label={subCategory}
                  value={subCategory}
                />
              ))}
            </Picker>
          </View>
        )}
        <TextInput style={styles.createNew}
          placeholder="Price"
          value={price.toString()}
          keyboardType="numeric"
          onChangeText={(value) => setPrice(isNaN(parseFloat(value)) ? 0 : parseFloat(value))}
        />
        <TouchableOpacity onPress={() => createNewProduct({ state })}>
          <View style={[styles.col]}>
            <Icon name="md-save" size={30} color="#000000aa" />
          </View>
        </TouchableOpacity>

      </Row>
    </View>
  );
}

const ModificationContextMenu = ({ id, objType, state, setIsEditMode, isEditMode, }: { id?: string, objType?: string, state?: any, isEditMode?: {}, setIsEditMode?: Dispatch<SetStateAction<{}>> }) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover
      popoverStyle={{ backgroundColor: '#4D535D' }}
      backgroundStyle={{ backgroundColor: "transparent" }}
      from={
        <TouchableOpacity onPress={() => setShowPopover(!showPopover)}>
          <Icon name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      }
    >
      <View style={styles.popIcon}>
        <TouchableOpacity onPress={() => setIsEditMode(!isEditMode)}>
          <Icon color="#fff" name="create-outline" size={30} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon onPress={() => {
            (objType == "product") ? () => {
              ProductAPI.delete(id).then((res) => {
                state.setProduct(state.products.filter((u) => u._id != id))
              });
            } : (objType == "order") ? () => 
            {
              OrdersAPI.delete(id).then((res) => {
                state.setUser(state.orders.filter((u) => u._id != id))
              });
            } : () => {
              UserAPI.delete(id).then((res) => {
                state.setUser(state.users.filter((u) => u._id != id))
              });
            }
            
          }} color="#ff3f2e" name="trash-outline" size={30} />
        </TouchableOpacity>
      </View>
    </Popover>
  )
}

const UserElement = ({ user, state }: {
  user: User, state: UserState;
}) => {
  const selectRow = (id, remove) => {
    console.log(state.selectedRows);
    (remove) ?
      state.setSelectedRows(state.selectedRows.filter((r) => r != id)) :
      state.setSelectedRows([...state.selectedRows, id]);
  }
  const [check, setCheck] = useState(false);
  return (
    <Row>
      <Column width={50}>
        <TouchableOpacity onPress={() => {
          setCheck(!check);
          selectRow(user._id, check);
        }}>
          <Icon name={(check) ? "checkbox-outline" : "square-outline"} size={20} color="#000" />
        </TouchableOpacity>
      </Column>
      <Column width={80}>{user?._id}</Column>
      <Column>{user?.name}</Column>
      <Column>{user?.email}</Column>
      <Column>{user?.role}</Column>
      <Column>{user?.phone}</Column>
      <Column width={80}>{user?.orders?.length}</Column>
      <Column>{user?.address?.street}</Column>
      <Column>{user?.address?.city}</Column>
      <Column>{user?.address?.state}</Column>
      <Column>{user?.address?.zip}</Column>
      <Column>{user?.address?.country}</Column>
      <Column width={50}>
        <ModificationContextMenu id={user._id} objType={"user"} state={state} />
      </Column>
    </Row>
  );
};

const ProductElement = ({ product, isEditMode, setIsEditMode, checkMarks, setCheckMarks }: { product: Product, isEditMode: {}, setIsEditMode: Dispatch<SetStateAction<{}>>, checkMarks: {}, setCheckMarks: Dispatch<SetStateAction<{}>> }) => {
  return (
    <Row>
      <View style={styles.col}>
        <Icon name="square-outline" size={20} color="#000" />
      </View>
      <Column>{product?._id}</Column>
      <Column>{isEditMode ? <TextInput value={product?.description} /> : product?.name}</Column>
      <Column>{isEditMode ? <TextInput value={product?.description} /> : product?.description}</Column>
      <Column>{isEditMode ? <TextInput value={product?.category} /> : product?.category}</Column>
      <Column>{isEditMode ? <TextInput value={product?.subcategory} /> : product?.subcategory}</Column>
      <Column>{isEditMode ? <TextInput value={product?.price?.toString()} /> : formatPrice(product?.price)}</Column>
      <Column>product?.images</Column>
      <Column>{isEditMode ? <Checkbox
        disabled={false}
        value={checkMarks[product?._id] || false}
        onValueChange={() => setCheckMarks({ ...checkMarks, [product?._id]: !checkMarks[product?._id] })}
      /> : product?.inStock}</Column>
      <View style={[styles.col, { alignItems: "center" }]}>
        <ModificationContextMenu id={product._id} objType={"product"} setIsEditMode={setIsEditMode} />
      </View>
    </Row>
  );
}


function OrderElement({ order }: { order: Order }) {
  return (
    <Row>
      <View style={styles.col}>
        <Icon name="square-outline" size={20} color="#000" />
      </View>
      <Column>{order?._id}</Column>
      <Column>
        {typeof order?.customer === "string"
          ? order?.customer
          : order?.customer?.name}
      </Column>
      <Column>{order?.createdAt}</Column>
      <Column>{order?.items.length}</Column>
      <Column>{formatPrice(order?.total)}</Column>
      <Column>{order?.updatedAt}</Column>
      <View style={[styles.col, { alignItems: "center" }]}>
        <ModificationContextMenu id={order._id} objType={"order"}/>
      </View>
    </Row>
  );
}

function ListUsers({ navigation }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUser] = useState([{}] as [User]);
  useEffect(() => {
    UserAPI.getAll().then((res) => setUser(res.data));
  }, []);

  const [asc, setAsc] = useState(true);
  const [field, setField] = useState("name");

  const sortData = (data) => {
    return data.sort((a, b) =>
      asc
        ? b[field]?.localeCompare(a[field])
        : a[field]?.localeCompare(b[field])
    );
  };

  const [searchProductsText, _searchProductsText] = useState("Search");
  const userData = document.routes.find((e) => e.route == "Users");
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation} />
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp" size={20} color="#000" />
          <TextInput
            style={styles.textInput}
            onChangeText={_searchProductsText}
            value={searchProductsText}
          />
        </View>
        {users && (
          <FlatList
            data={sortData(users)}
            renderItem={({ item, index }) => (
              <UserElement user={item} key={index} state={{ users, setUser, selectedRows, setSelectedRows }} />
            )}
            ListHeaderComponent={() => (
              <UsersTableHeader
                state={{ asc, setAsc, field, setField, users, setUser }}
                labels={userData.labels}
                properties={
                  userData.properties
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

function ListProducts({ navigation }) {
  const [products, setProducts] = useState([]);
  const [asc, setAsc] = useState(true);
  const [field, setField] = useState("name");
  const [isEditMode, setIsEditMode] = useState({});
  const [checkMarks, setCheckMarks] = useState({});

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[field] != undefined && b[field] != undefined) {
        return asc
          ? b[field].localeCompare(a[field])
          : a[field].localeCompare(b[field]);
      }
    });
  };

  useEffect(() => {
    ProductAPI.getAll().then((res) => setProducts(res.data));
  }, []);
  const [searchUserText, _searchUserText] = useState("Search");
  const productData = document.routes.find((e) => e.route == "Products");
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation} />
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp" size={20} color="#000" />
          <TextInput
            style={styles.textInput}
            onChangeText={_searchUserText}
            value={searchUserText}
          />
        </View>
        {products && (
          <FlatList
            data={sortData(products)}
            renderItem={({ item, index }) => (
              <ProductElement product={item} key={index} isEditMode={isEditMode} setIsEditMode={setIsEditMode} checkMarks={checkMarks} setCheckMarks={setCheckMarks} />
            )}
            ListHeaderComponent={() => (
              <ProductsTableHeader
                state={{ asc, setAsc, field, setField, products, setProducts }}
                labels={productData.labels}
                properties={
                  productData.properties
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

function ListOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [asc, setAsc] = useState(true);
  const [field, setField] = useState("name");

  const sortData = (data) => {
    return data.sort((a, b) => {
      try {
        return asc
          ? b[field]?.localeCompare(a[field])
          : a[field]?.localeCompare(b[field]);
      } catch (error) {
        console.log(error);
        return data;
      }
    });
  };

  useEffect(() => {
    OrdersAPI.getAll().then((res) => setOrders(res.data));
  }, []);
  const [searchOrderText, _searchOrderText] = useState("Search");
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation} />
      <View style={styles.section}>
        <View style={styles.listFilters}>
          <Icon name="search-sharp" size={20} color="#000" />
          <TextInput
            style={styles.textInput}
            onChangeText={_searchOrderText}
            value={searchOrderText}
          />
        </View>
        {orders && (
          <FlatList
            data={sortData(orders)}
            renderItem={({ item, index }) => (
              <OrderElement order={item} key={index} />
            )}
            ListHeaderComponent={() => (
              <TableHeader
                state={{ asc, setAsc, field, setField }}
                labels={document.routes.find((e) => e.route == "Orders").labels}
                properties={
                  document.routes.find((e) => e.route == "Orders").properties
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

export const Admin = ({ dimensions }: { dimensions: ScaledSize }) => {
  //Gather the data
  const checkMobile = (dimensions: ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 992) ? true : false }
  const Stack = createStackNavigator();
  function AdminPages() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#fff", flex: 1 },
        }}
      >
        {document.routes.map((item, i) => (
          <Stack.Screen name={item.route} key={i} component={item.component} />
        ))}
      </Stack.Navigator>
    );
  }
  return (checkMobile(dimensions)) ? (
    <View style={styles.wholePage}>
      <Icon name="sad-outline" size={60} color="#000" />
      <Text style={styles.wholePageMessage}>Why not use web for admin?</Text>
    </View>
  ) : (
    <View style={[styles.container]}>
      <NavigationContainer independent={true}>
        <AdminPages />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  wholePageMessage: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  //Navigation Bar Styles
  active: {
    backgroundColor: "#ffffff33",
  },
  inactive: {
    backgroundColor: "#ffffff00",
  },
  navbutton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 30,
    gap: 5,
    width: "100%",
    fontSize: 20,
  },
  navigationMenu: {
    height: "100%",
    backgroundColor: "#000",
    flexDirection: "column",
    paddingVertical: "1rem",
  },
  //Container Styles
  section: {
    flex: 1,
    flexDirection: "column",
    borderTopColor: "#6a7b76",
    borderTopWidth: 10,
    margin: "2rem",
    padding: "1rem",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  //Generic Styles
  rowSimple: {
    flex: 1,
    flexDirection: "row",
  },
  textWhite: {
    color: "#fff",
  },
  //Table Styles
  hoverOver: {
    backgroundColor: "#00000011",
  },
  createNew: {
    borderStyle: "dashed",
    borderColor: "#6a7b76cc",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD4f",
    padding: 10,
    borderRadius: 5,
  },
  listFilters: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 10,
    borderRadius: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    padding: "2rem",
  },
  rowHeader: {
    borderBottomColor: "#f0f1f1",
    borderBottomWidth: 3,
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
  rowHeaderText: {
    paddingHorizontal: 5,
    fontWeight: "700",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#efefef",
    borderBottomWidth: 1,
  },
  headerElement: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    padding: ".5rem",
  },
  header: {
    margin: 20,
    fontSize: 48,
    color: "#262626",
  },
  bodyText: {
    marginHorizontal: 20,
    fontSize: 24,
    color: "#262626",
  },
  popIcon: {
    borderRadius: 5,
    flexDirection: "row",
    padding: 15,
    gap: 15,
  },
});
