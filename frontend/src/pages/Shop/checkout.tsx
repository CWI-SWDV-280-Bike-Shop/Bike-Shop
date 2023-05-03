import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ScaledSize, Platform, useWindowDimensions, TextInput, Button} from 'react-native';
import { ShopContext } from '@/context/shop.context';
import { Product, Order } from '@/types/data.types';
import Layout from '@/styles/layout/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@/utilities/formatter';
import { AuthContext } from '@/context/auth.context';
import { colors } from '@/styles/theme/Colors';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { LoginScreen, RegisterScreen } from '../login';



export const Checkout = (props: DrawerHeaderProps) => {
  //these prices are based off of https://www.ups.com/assets/resources/webcontent/en_US/daily_rates.pdf
  const streetBikeShipping = 16.10;
  const mountainBikeShipping = 19.45;
  const eBikeShipping = 38.99;
  const accessoriesShipping = 11.67;
  //Auth
	const { authUser } = useContext(AuthContext);
	const [register, setRegister] = useState(false);
  //Shop
  const { products, quantity, total, checkout, removeFromCart, message } = useContext(ShopContext);
  //Responsive
  const dimensions = useWindowDimensions();
  const checkMobile = (dimensions: ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 768) ? true : false }
  const responsive = checkMobile(dimensions) ? mobile : web;
  //Set Order
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  //State/Country
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const handleCheckout = async () => {
    if (products) {
      const order = await checkout(products, authUser);
      setOrder(order);
      props.navigation.navigate("Checkout");
    }
    else {
      setErrorMessage('Your have nothing in your cart!')
    }
  };

  const calculateShipping = (products: Product[]) => {
    let cost = 0;
    products.map(product => {
      if (product.category == 'Bikes') {
        if (product.subcategory == 'Mountain') {
          cost += mountainBikeShipping;
        } else if (product.subcategory == 'Street') {
          cost += streetBikeShipping;
        } else if (product.subcategory == 'Electric') {
          cost += eBikeShipping;
        }
      }
      else if (product.category == 'Accessories') {
        cost += accessoriesShipping;
      }
      // else if (product.category == 'Services') { Dumb logic that does not need to be here. Must have been sleep deprived this day.
      //   cost += 0;
      // }
    });
    return cost;
  }

  const ListOrderItems = (products: Product[]) => {
    let orderItems = "\n";
    products.map((item: Product) => {
      orderItems += "Product: " + item.name + " "
      orderItems += "Item Price: " + formatPrice(item.price) + " "
      orderItems += '\n'
    });
    return orderItems;
  }

  return !authUser ? (
	<View>
			<Button title="Login" onPress={() => setRegister(false)} />
			<Text>OR</Text>
			<Button title="Register" onPress={() => setRegister(true)} />
			{register ? (
				<RegisterScreen props={props} />
			) : (
				<LoginScreen props={props} />
			)}
		</View>
	) : (
    <View style={[Styles.container, responsive.container]}>
      <View style={Styles.info}>
        <ScrollView >
          <View style={Styles.headerBox}>
            <Text style={Styles.header}>1. Shipping</Text>
          </View>
          <View style={Styles.shippingInfo}>
            <View style={Styles.shippingDetails}>
              <View style={Styles.shippingDetailsRight}><TextInput style={Styles.shippingInput} placeholder="First Name" placeholderTextColor={"grey"}/></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsRight}><TextInput style={Styles.shippingInput} placeholder="Last Name" placeholderTextColor={"grey"}/></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsRight}><TextInput style={Styles.shippingInput} placeholder="Postal Code" placeholderTextColor={"grey"}/></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsRight}><TextInput style={Styles.shippingInput} placeholder="Address 1" placeholderTextColor={"grey"}/></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsRight}><TextInput style={Styles.shippingInput} placeholder="City" placeholderTextColor={"grey"}/></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsLeft}><Text>State</Text></View>
              <View style={Styles.shippingDetailsRight}><Picker
                        style={Layout.input}
                        selectedValue={state}
                        onValueChange={(value) => setState(value)}
                    >
                        <Picker.Item label="-Select State-" />
                        <Picker.Item label="Alabama" value="Alabama" />
                        <Picker.Item label="Alaska" value="Alaska" />
                        <Picker.Item label="Arizona" value="Arizona" />
                        <Picker.Item label="Arkansas" value="Arkansas" />
                        <Picker.Item label="California" value="California" />
                        <Picker.Item label="Colorado" value="Colorado" />
                        <Picker.Item label="Connecticut" value="Connecticut" />
                        <Picker.Item label="Delaware" value="Delaware" />
                        <Picker.Item label="Florida" value="Florida" />
                        <Picker.Item label="Georgia" value="Georgia" />
                        <Picker.Item label="Hawaii" value="Hawaii" />
                        <Picker.Item label="Idaho" value="Idaho" />
                        <Picker.Item label="Illinois" value="Illinois" />
                        <Picker.Item label="Indiana" value="Indiana" />
                        <Picker.Item label="Iowa" value="Iowa" />
                        <Picker.Item label="Kansas" value="Kansas" />
                        <Picker.Item label="Kentucky" value="Kentucky" />
                        <Picker.Item label="Louisiana" value="Louisiana" />
                        <Picker.Item label="Maine" value="Maine" />
                        <Picker.Item label="Maryland" value="Maryland" />
                        <Picker.Item label="Massachusetts" value="Massachusetts" />
                        <Picker.Item label="Michigan" value="Michigan" />
                        <Picker.Item label="Minnesota" value="Minnesota" />
                        <Picker.Item label="Mississippi" value="Mississippi" />
                        <Picker.Item label="Missouri" value="Missouri" />
                        <Picker.Item label="Montana" value="Montana" />
                        <Picker.Item label="Nebraska" value="Nebraska" />
                        <Picker.Item label="Nevada" value="Nevada" />
                        <Picker.Item label="New Hampshire" value="New Hampshire" />
                        <Picker.Item label="New Jersey" value="New Jersey" />
                        <Picker.Item label="New Mexico" value="New Mexico" />
                        <Picker.Item label="New York" value="New York" />
                        <Picker.Item label="North Carolina" value="North Carolina" />
                        <Picker.Item label="North Dakota" value="North Dakota" />
                        <Picker.Item label="Ohio" value="Ohio" />
                        <Picker.Item label="Oklahoma" value="Oklahoma" />
                        <Picker.Item label="Oregon" value="Oregon" />
                        <Picker.Item label="Pennsylvania" value="Pennsylvania" />
                        <Picker.Item label="Rhode Island" value="Rhode Island" />
                        <Picker.Item label="South Carolina" value="South Carolina" />
                        <Picker.Item label="South Dakota" value="South Dakota" />
                        <Picker.Item label="Tennessee" value="Tennessee" />
                        <Picker.Item label="Texas" value="Texas" />
                        <Picker.Item label="Utah" value="Utah" />
                        <Picker.Item label="Vermont" value="Vermont" />
                        <Picker.Item label="Virginia" value="Virginia" />
                        <Picker.Item label="Washington" value="Washington" />
                        <Picker.Item label="West Virginia" value="West Virginia" />
                        <Picker.Item label="Wisconsin" value="Wisconsin" />
                        <Picker.Item label="Wyoming" value="Wyoming" />
                    </Picker></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsLeft}><Text>Country</Text></View>
              <View style={Styles.shippingDetailsRight}><Picker
                        style={Layout.input}
                        selectedValue={country}
                        onValueChange={(value) => setCountry(value)}
                    >
                        <Picker.Item label="-Select Country-" />
                        <Picker.Item label="Canada" value="Canada" />
                        <Picker.Item label="United States" value="United States" />
                        <Picker.Item label="Mexico" value="Mexico" />
                    </Picker></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsRight}><TextInput style={Styles.shippingInput} placeholder="Phone" placeholderTextColor={"grey"}/></View>
            </View>
            <View>
              <View style={Styles.shippingDetailsRight}><TextInput style={Styles.shippingInput} placeholder="Email" placeholderTextColor={"grey"}/></View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={[Styles.cart, responsive.cart]}>
        <View style={Styles.summaryBox, responsive.summaryBox}>
          <View style={Styles.headerBoxRight}>
            <Text style={Styles.header}>Summary</Text>
          </View>
          <Text style={Styles.bodyText}>Shipping: {products && formatPrice(calculateShipping(products))}</Text>
          <Text style={Styles.bodyText}>Sub Total: {formatPrice(total)}</Text>
          <Text style={Styles.bodyText}>State Tax: {formatPrice(total * 0.06)}</Text>
          <Text style={Styles.bodyText}>Total:{formatPrice((total * 1.06) + (products && calculateShipping(products)))}</Text>
        </View>
        <View style={Styles.inYourCart, responsive.inYourCart}>
          <View style={Styles.headerBoxRight}>
            <Text style={Styles.header}>In Your Cart &#40;{quantity}&#41;</Text>
          </View>
          {/* <Text style={Styles.bodyText}>Quantity of Items/Services: {quantity}</Text> */}
          <Text style={Styles.bodyText}>Shipping: {products && formatPrice(calculateShipping(products))}</Text>
          <Text style={Styles.bodyText}>Ordered Items: {quantity == 0 || null ? 'There is nothing in your cart' : (products && ListOrderItems(products))}</Text>
          <Text>{errorMessage}</Text>{/* This does not have Styles yet TODO */}
        </View>
      </View>
    </View >
  );
};

export default Checkout;


const mobile = StyleSheet.create({
  container: {
    // flexDirection: "row",
    flexDirection: "column",
  },
  cart: {
  },
  inYourCart: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
  summaryBox: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
});

const web = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cart: {
  },
  inYourCart: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
  summaryBox: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
});

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    flex: 1,
  },
  cart: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 5,
  },
  shippingInfo: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  summaryBox: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
  inYourCart: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
  info: {
    margin: 5,
    backgroundColor: '#a6a4a4',
    borderRadius: 10,
    flex: 4,
    flexDirection: "column",
    justifyContent: 'center',
    // padding: 20,
  },
  productCard: {
    margin: 10,

    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#6A7B76',
    borderRadius: 10,
  },
  button: {
    height: 50,
    width: 150,
    padding: 10,
    margin: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  header: {
    marginLeft: 10,
    fontSize: 35,
    color: "white",
  },
  headerBox: {
    // marginTop: 10,
    fontSize: 35,
    backgroundColor: 'black',
    color: "white",
    alignContent: 'flex-start',
    borderRadius: 5,
  },
  headerBoxRight: {
    // marginTop: 10,
    fontSize: 35,
    backgroundColor: '#a6a4a4',
    color: "white",
    alignContent: 'flex-start',
    borderRadius: 5,
  },
  bodyText: {
    marginTop: 15,
    fontSize: 24,
    color: "#262626",
    textAlign: "center",
  },
  cardText: {
    margin: 4,
    fontSize: 15,
  },
  shippingInput: {
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
	padding: 5,
	marginBottom: 5,
  },
  shippingDetails: {
	flex: 4,
    flexDirection: "row",
  },
  shippingDetailsLeft: {
	alignContent: 'flex-start',
  },
  shippingDetailsRight: {
	justifyContent: 'flex-end',
  }

});


