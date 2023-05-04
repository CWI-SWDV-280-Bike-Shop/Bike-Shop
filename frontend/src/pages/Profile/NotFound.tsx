import React from "react";
  import {
    Text,
    View,
    StyleSheet
  } from "react-native";
  import Icon from "react-native-vector-icons/Ionicons";

export const NotFound = () => {
  return (
    <View style={styles.wholePage}>
      <Icon name="sad-outline" size={60} color="#000" />
      <Text style={styles.wholePageMessage}>Sorry there's nothing there.</Text>
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
});