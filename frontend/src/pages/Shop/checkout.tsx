import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  InputModeOptions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { AuthContext } from '@/context/auth.context';
import { Login } from '../login';
import Layout from '@/styles/layout/Layout';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { ShopContext } from '@/context/shop.context';
import { CartItem, Order, User, Address } from '@/types/data.types';
import UserAPI from '@/api/user.api';
import { colors } from '@/styles/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@/utilities/formatter';

const Checkout = (props: DrawerHeaderProps) => {
  const { authUser } = useContext(AuthContext);
  const { cartItems, checkout, quantity, total } = useContext(ShopContext);
  const [order, setOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [fullName, setfullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState<Address | null>({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  useEffect(() => {
    if (authUser) {
      UserAPI.getById(authUser?._id).then((res) => setUser(res.data));
    }
  }, [authUser]);

  const handleSubmitOrder = async () => {
    if (isChecked) {
      const order = await checkout(cartItems, authUser, address);
      setOrder(order);
    } else {
      const order = await checkout(cartItems, authUser, user?.address);
      setOrder(order);
    }
  };

  const onChangeAddress = (fieldName: string, value: string) => {
    setAddress({ ...address, [fieldName]: value });
  };

  const formAddr = [
    {
      label: 'Street',
      stateValue: address.street,
    },
    {
      label: 'City',
      stateValue: address.city,
    },
    {
      label: 'State',
      stateValue: address.state,
    },
    {
      label: 'Zipcode',
      inputMode: 'numeric',
      stateValue: address.zip,
    },
    {
      label: 'Country',
      stateValue: address.country,
    },
  ];

  return !authUser ? (
    <View style={Styles.container}>
      <Login {...props} />
    </View>
  ) : (
    <View style={[Styles.container]}>
      {/* if checkout complete and order created, show OrderConfirmation */}
      {(order && (
        <View style={[Styles.contentContainer]}>
          <View style={[Styles.headerContainer]}>
            {/*<Icon name="close-outline" size={30} color="black" />*/}
            <Text style={[Styles.header]}>Checkout Confirmation</Text>
          </View>
          <View style={[Styles.bodyContent]}>
            <Icon
              style={[Styles.bodyCheckMark]}
              name="checkbox-outline"
              size={70}
              color="green"
            />
            <Text style={[Styles.bodyThanks]}>
              Thank you for your order {authUser?.name}!
            </Text>
            <Text style={[Styles.bodyConfirmation]}>Your Order number is</Text>
            <Text style={[Styles.bodyOrderNumber]}>{order._id}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[Layout.button, { margin: 10 }]}
              onPress={() => {
                props.navigation.navigate('Shop');
                setOrder(null);
              }}
            >
              <Text style={Layout.buttonContent}>Continue Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.button,
                {
                  margin: 10,
                  backgroundColor: colors.xanadu,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Orders');
                setOrder(null);
              }}
            >
              <Text style={[Layout.buttonContent]}>View Your Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      )) || (
        <View>
          <Text style={[Styles.title, Styles.bold]}>Checkout</Text>
          <ScrollView style={{ padding: 10 }}>
            <View style={Styles.card}>
              <Text style={[Layout.subtitle]}>Shipping</Text>
              <View>
                <Text>
                  <Text style={Styles.bold}>Name: </Text>
                  {user?.name}
                </Text>
                <Text>
                  <Text style={Styles.bold}>Email: </Text>
                  {user?.email}
                </Text>
                <Text>
                  <Text style={Styles.bold}>Street: </Text>
                  {user?.address?.street}
                </Text>
                <Text>
                  <Text style={Styles.bold}>City: </Text>
                  {user?.address?.city}
                </Text>
                <Text>
                  <Text style={Styles.bold}>State: </Text>
                  {user?.address?.state}
                </Text>
                <Text>
                  <Text style={Styles.bold}>Zip: </Text>
                  {user?.address?.zip}
                </Text>
                <Text>
                  <Text style={Styles.bold}>Country: </Text>
                  {user?.address?.country}
                </Text>
              </View>
              <View style={[Styles.row, { alignItems: 'center' }]}>
                <Checkbox
                  style={{ margin: 10 }}
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? colors.artichoke : undefined}
                />
                <Text>Use different shipping address?</Text>
              </View>
              {isChecked && (
                <View>
                  <View>
                    {formAddr.map((item, i) => (
                      <View key={i}>
                        <Text style={Styles.label}>{item.label}</Text>
                        <TextInput
                          style={Styles.editBox}
                          inputMode={item.inputMode as InputModeOptions}
                          value={item.stateValue}
                          onChangeText={(value) =>
                            onChangeAddress(item.label.toLowerCase(), value)
                          }
                        />
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <Text style={[Layout.errorText]}>{errorMessage}</Text>
            </View>
            <View style={Styles.card}>
              <Text style={Layout.subtitle}>Order Summary</Text>
              <View>
                {cartItems.map((cartItem: CartItem, index) => (
                  <View
                    style={[Styles.row, { justifyContent: 'space-between' }]}
                    key={index}
                  >
                    {/* Product */}
                    <View style={[Styles.row, { gap: 10 }]}>
                      <View style={[Styles.center, { padding: 10 }]}>
                        {(cartItem?.product?.image && (
                          <ImageBackground
                            style={Styles.productImage}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            source={cartItem?.product?.image}
                            resizeMode="contain"
                          />
                        )) || <Icon name="image-outline" size={128} />}
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <Text style={Styles.productName}>
                          {cartItem?.product?.name}{' '}
                          <Text style={{ fontWeight: 'normal' }}>
                            x{cartItem?.quantity}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={Styles.center}>
                      <Text style={Styles.productPrice}>
                        {formatPrice(cartItem?.product?.price)}
                      </Text>
                    </View>
                  </View>
                ))}
                <View>
                  <View style={Styles.space}>
                    <View style={[Styles.spread, Styles.row]}>
                      <Text style={Styles.checkoutText}>Items:</Text>
                      <Text style={[Styles.checkoutText, Styles.bold]}>
                        {quantity}
                      </Text>
                    </View>
                    <View style={[Styles.spread, Styles.row]}>
                      <Text style={Styles.checkoutText}>Total:</Text>
                      <Text style={[Styles.checkoutText, Styles.bold]}>
                        {formatPrice(total)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={Styles.submitBtn}
                    onPress={handleSubmitOrder}
                  >
                    <Text style={Styles.submitBtnText}>Submit Order</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Checkout;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
  },
  spread: {
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    margin: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: 'gray',
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#777',
    fontWeight: 'bold',
    position: 'relative',
    bottom: -30,
    left: 20,
  },
  editBox: {
    paddingTop: 32,
    padding: 16,
    marginBottom: 20,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,
    elevation: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.artichoke,
  },
  productLabel: {
    fontWeight: 'bold',
  },
  checkoutText: {
    fontSize: 24,
  },
  submitBtn: {
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    backgroundColor: colors.feldgrau,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Order Confirmation
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    margin: 20,
    fontSize: 50,
    //color:"#3E6259",
    //color:"#6A7B76",
    //color:"#8B9D83",
    //color:"#3E6259",
  },
  headerContainer: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  bodyContent: {
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyCheckMark: {
    marginBottom: 10,
  },
  bodyThanks: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  bodyConfirmation: {
    fontSize: 30,
    margin: 4,
  },
  bodyOrderNumber: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  bodyShop: {
    fontSize: 30,
    borderBottomColor: 'black',
    borderWidth: 3,
    borderStyle: 'solid',
    padding: 16,
    fontWeight: 'bold',
  },
});