import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Button
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
import { AuthContext } from '@/context/auth.context';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { setProperty, getProperty } from 'dot-prop';
import { AxiosResponse } from 'axios';
import * as ImagePicker from 'expo-image-picker';

// Search can be implemented like I did sorting, button needs selector for which field to search
// Need a wrapper or something that calls this so I can do more complex features
// Figure out auto option instead of flex 1 so things like description can take up more space
// Better fonts

type SetState<T> = Dispatch<SetStateAction<T>>;

const withNewImage = async (images: Product['images'], newURL: string) =>
  newURL
    ? {
        images: [{ newImageIndex: 0, url: newURL }],
        newImages: await (await fetch(newURL)).blob(),
      }
    : {};
function ImageUpload({
  data,
  setData,
  isEditMode,
}: {
  data: Product;
  setData: SetState<Product>;
  isEditMode: boolean;
}) {
  const firstImage = data.images?.[0] ?? {};

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) return;
    setData({
      ...data,
      ...(await withNewImage(data.images, result.assets[0].uri)),
    });
  };
  return (
    <Row>
      {'url' in firstImage && firstImage.url && (
        <Image
          source={{
            uri: firstImage.url,
            width: 42,
            height: 42,
          }}
        />
      )}
      <Button
        title={'url' in firstImage && firstImage.url ? 'Replace' : 'Upload'}
        onPress={pickImage}
        disabled={!isEditMode}
      />
    </Row>
  );
}

//One large object everything can reference so you don't have to go looking for stuff
const document = {
  routes: [
    {
      route: 'Users',
      icon: 'people-outline',
      properties: [
        ['id', ({ data }) => data?._id],
        ['name', ['name', 'string']],
        ['email', ['email', 'string']],
        ['role', ['role', 'string']],
        ['phone', ['phone', 'string']],
        ['orders', ({ data }) => data?.orders?.length],
        ['street', ['address.street', 'string']],
        ['city', ['address.city', 'string']],
        ['state', ['address.state', 'string']],
        ['zip', ['address.zip', 'string']],
        ['country', ['address.country', 'string']],
      ],
      api: UserAPI,
    },
    {
      route: 'Products',
      icon: 'pricetags-outline',
      properties: [
        ['id', ({ data }) => data?._id],
        ['name', ['name', 'string']],
        ['description', ['description', 'string']],
        ['category', ['category', 'string']],
        ['subcategory', ['subcategory', 'string']],
        ['price', ['price', 'number']],
        ['image', ImageUpload],
        ['in stock', ['inStock', 'boolean']],
      ],
      api: ProductAPI,
    },
    {
      route: 'Orders',
      icon: 'receipt-outline',
      properties: [
        ['id', ({ data }) => data?._id],
        ['purchased by', ({ data }) => data?.customer?.name],
        ['created at', ['createdAt', 'date']],
        ['items', ({ data }) => data?.items?.length],
        ['total', ['total', 'number']],
        ['updated at', ({ data }) => data?.updatedAt],
      ],
      api: OrdersAPI,
    },
  ] as const,
};

type API<T> = {
  delete: (id: string) => Promise<AxiosResponse>;
  create: (newItem: T) => Promise<AxiosResponse>;
  update: (id: string, newItem: T) => Promise<AxiosResponse>;
  getAll: () => Promise<AxiosResponse>;
};

type State<T> = {
  sort: {
    asc: boolean;
    setAsc: SetState<boolean>;
    field: string;
    setField: SetState<string>;
  };
  items: T[];
  setAll: SetState<T[]>;
  selectedRows?: string[];
  setSelectedRows?: SetState<string[]>;
  api: API<T>;
};

type Properties<T> = ReadonlyArray<
  readonly [
    label: string,
    component:
      | readonly [key: string, type: string | number]
      | ((props: {
          data: T;
          setData: Dispatch<T>;
          isEditMode?: boolean;
        }) => Children)
  ]
>;

const NavigationMenu = ({ navigation }) => {
  const checkPage = (page) => {
    return (
      navigation.getState().routeNames[navigation.getState().index] == page
    );
  };
  return (
    <View style={styles.navigationMenu}>
      {document.routes.map((item) => (
        <TouchableOpacity
          key={item.route}
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

function TableHeader<T extends { _id?: string }>({
  properties,
  state,
}: {
  properties: Properties<T>;
  state?: State<Partial<T>>;
}) {
  const [newItem, setNewItem] = useState({} as Partial<T>);

  return (
    <>
      <Row>
        <Column></Column>
        {properties.map(([label], i) => (
          <Column header={true} key={label}>
            <Text style={styles.rowHeaderText}>{label}</Text>
            {Array.isArray(properties[1]) && (
              <TouchableOpacity
                onPressOut={() => {
                  state.sort.setField(properties[1][0]);
                  state.sort.setAsc(!state.sort.asc);
                }}
              >
                <Icon name='swap-vertical' size={20} color='#000000aa' />
              </TouchableOpacity>
            )}
          </Column>
        ))}
      </Row>
      <Row>
        <Column></Column>
        <DataFields
          properties={properties}
          item={newItem}
          setItem={setNewItem}
          isEditMode={true}
        />
        <TouchableOpacity
          onPress={() => {
            state.api.create(newItem).then((res) => {
              if (res.status == 200) {
                newItem._id = res.data._id;
                state.setAll([...state.items, newItem]);
              }
            });
          }}
        >
          <View style={[styles.col]}>
            <Icon name='md-save' size={30} color='#000000aa' />
          </View>
        </TouchableOpacity>
      </Row>
    </>
  );
}

const Row = ({ children }: { children?: Children }) => (
  <Pressable style={({ hovered }) => [hovered && styles.hoverOver]}>
    <View style={styles.row}>{children}</View>
  </Pressable>
);

const Column = ({
  overflow,
  width = 150,
  header,
  children,
}: {
  overflow?: boolean;
  width?: number;
  header?: boolean;
  children?: Children;
}) => {
  return (
    <View
      style={[styles.col, { width: width }, header ? styles.headerElement : {}]}
    >
      <Text numberOfLines={overflow ? 10 : 1}>{children}</Text>
    </View>
  );
};

function ModificationContextMenu<T extends { _id?: string }>({
  data,
  state,
  setIsEditMode,
  isEditMode,
}: {
  data?: T;
  isEditMode?: boolean;
  setIsEditMode?: SetState<boolean>;
  state: State<T>;
}) {
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
        <TouchableOpacity
          onPress={async () => {
            if (isEditMode) await state.api.update(data._id, data);
            setIsEditMode(!isEditMode);
          }}
        >
          <Icon
            color='#fff'
            name={isEditMode ? 'save-outline' : 'create-outline'}
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon
            onPress={async () => {
              await state.api.delete(data._id);
              state.setAll(
                state.items.filter((existing) => existing._id !== data._id)
              );
            }}
            color='#ff3f2e'
            name='trash-outline'
            size={30}
          />
        </TouchableOpacity>
      </View>
    </Popover>
  );
}

function DataFields<T extends { _id?: string }>(props: {
  properties: Properties<T>;
  item: T;
  setItem: SetState<T>;
  isEditMode: boolean;
}) {
  const { properties, item, setItem, isEditMode } = props;

  return (
    <>
      {properties.map(([label, propertyComponent]) => {
        if (typeof propertyComponent === 'function') {
          return (
            <Column key={label}>
              {propertyComponent({
                data: item,
                setData: setItem,
                isEditMode,
              })}
            </Column>
          );
        }
        const [key, type] = propertyComponent;
        const onChange = (value: unknown) =>
          setItem(setProperty(Object.create(item), key, value));
        const value: unknown = getProperty(item, key);
        return (
          <Column key={label}>
            {
              {
                string: (
                  <TextInput
                    value={value?.toString() ?? ''}
                    placeholder={label}
                    editable={isEditMode}
                    onChangeText={(text) => onChange(text)}
                  />
                ),
                number: (
                  <TextInput
                    value={value?.toString() ?? ''}
                    placeholder={label}
                    keyboardType='numeric'
                    editable={isEditMode}
                    onChangeText={(text) =>
                      onChange(isNaN(parseFloat(text)) ? parseFloat(text) : '')
                    }
                  />
                ),
                boolean: (
                  <Checkbox
                    disabled={!isEditMode}
                    value={value === true}
                    onValueChange={onChange}
                  />
                ),
              }[type]
            }
          </Column>
        );
      })}
    </>
  );
}

function DataRow<T extends { _id?: string }>({
  item,
  index,
  state,
  properties,
}: {
  item: T;
  index: number;
  state: State<T>;
  properties: Properties<T>;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  useEffect(() => {
    setUpdatedData(item);
  }, [item]);
  const selectRow = (id, remove) => {
    console.log(state.selectedRows);
    remove
      ? state.setSelectedRows(state.selectedRows.filter((r) => r != id))
      : state.setSelectedRows([...state.selectedRows, id]);
  };
  const [rowSelectionCheck, setRowSelectionCheck] = useState(false);

  return (
    <Row key={item._id ?? index}>
      <Column>
        {/* <TouchableOpacity
          onPress={() => {
            setRowSelectionCheck(!rowSelectionCheck);
            selectRow(item._id, rowSelectionCheck);
          }}
        >
          <Icon
            name={rowSelectionCheck ? 'checkbox-outline' : 'square-outline'}
            size={20}
            color='#000'
          />
        </TouchableOpacity> */}
        {isEditMode && <Icon name='pencil-outline' size={20} />}
      </Column>
      <DataFields
        properties={properties}
        item={updatedData}
        setItem={setUpdatedData}
        isEditMode={isEditMode}
      />
      <View style={[styles.col, { alignItems: 'center' }]}>
        <ModificationContextMenu
          data={updatedData}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          state={state}
        />
      </View>
    </Row>
  );
}

function AdminDataTable<T extends { _id?: string }>(props: {
  properties: Properties<T>;
  navigation: any;
  api: API<T>;
}) {
  const { properties, navigation, api } = props;
  const [data, setData] = useState([] as T[]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [asc, setAsc] = useState(true);
  const [field, setField] = useState('name');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    props.api.getAll().then((res) => setData(res.data));
  }, []);
  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      if (a?.[field] !== undefined && b?.[field] !== undefined) {
        return asc
          ? b[field].localeCompare(a[field])
          : a[field].localeCompare(b[field]);
      }
    });
  }, [asc, field, data]);

  const state = {
    items: data,
    setAll: setData,
    selectedRows,
    setSelectedRows,
    api,
    sort: {
      field,
      setField,
      asc,
      setAsc,
    },
  };
  return (
    <View style={styles.rowSimple}>
      <NavigationMenu navigation={navigation} />
      <View style={styles.section}>
        {/* <View style={styles.listFilters}>
          <Icon name="search-sharp" size={20} color="#000" />
          <TextInput
            style={styles.textInput}
            onChangeText={setSearchText}
            value={searchText}
          />
        </View> */}
        {data && (
          <FlatList
            data={sortedData}
            renderItem={({ item, index }) => (
              <DataRow
                properties={properties}
                state={state}
                item={item}
                index={index}
              />
            )}
            ListHeaderComponent={() => (
              <TableHeader state={state} properties={properties} />
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
        {document.routes.map((item) => (
          <Stack.Screen name={item.route} key={item.route}>
            {({ navigation }) => (
              <AdminDataTable
                api={item.api}
                navigation={navigation}
                properties={item.properties}
              />
            )}
          </Stack.Screen>
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
