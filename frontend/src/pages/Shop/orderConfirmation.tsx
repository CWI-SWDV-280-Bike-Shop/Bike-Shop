import { DrawerHeaderProps } from "@react-navigation/drawer";
import * as React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Layout from '@/styles/layout/Layout';
import { colors } from '@/styles/theme/Colors';

export const OrderConfirmation = (props: DrawerHeaderProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.contentContainer]}>
        <View style={[styles.headerContainer]}>
          {/*<Icon name="close-outline" size={30} color="black" />*/}
          <Text style={[styles.header]}>Checkout Confirmation</Text>
        </View>
        <View style={[styles.bodyContent]}>
          <Icon
            style={[styles.bodyCheckMark]}
            name="checkbox-outline"
            size={70}
            color="green"
          />
          <Text style={[styles.bodyThanks]}>Thank you for your order!</Text>
          <Text style={[styles.bodyConfirmation]}>Your Order number is</Text>
          <Text style={[styles.bodyOrderNumber]}>order._id</Text>
        </View>
        <View>
          <TouchableOpacity
            style={[Layout.button, { margin: 10 }]}
            onPress={() => {
              props.navigation.navigate('Shop');
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
            }}
          >
            <Text style={[Layout.buttonContent]}>View Your Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  bodyContent: {
    margin: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyCheckMark: {
    marginBottom: 10,
  },
  bodyThanks: {
    fontWeight: "bold",
    fontSize: 30,
  },
  bodyConfirmation: {
    fontSize: 30,
    margin: 4,
  },
  bodyOrderNumber: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bodyShop: {
    fontSize: 30,
    borderBottomColor: "black",
    borderWidth: 3,
    borderStyle: "solid",
    padding: 16,
    fontWeight: "bold",
  },
});
