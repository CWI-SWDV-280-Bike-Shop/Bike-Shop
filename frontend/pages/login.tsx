import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Login = () => {
  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.contentContainer]}>
        <Text style={[styles.header]}>Login</Text>
        <Text style={[styles.bodyText]}>
          Please login to see your profile.
        </Text>
        <TextInput style={[styles.textArea]} placeholder='Email' />
        <TextInput style={[styles.textArea]} placeholder='Password' secureTextEntry={true} />
        <TouchableOpacity style={styles.button}>
          <Icon
            name="log-in-outline"
            size={60}
            color="#FFF"
          />
          <Text style={styles.buttonContent}> Login</Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Text style={[styles.header]}>New here? Please sign up!</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ marginRight: 15, }}>
              <Text style={[styles.bodyText]}>Information</Text>
              <TextInput style={styles.textArea} placeholder='Full Name' />
              <TextInput style={styles.textArea} inputMode='email' placeholder='Email' />
              <TextInput style={styles.textArea} placeholder='Password' secureTextEntry={true} />
              <TextInput style={styles.textArea} placeholder='Confirm Password' secureTextEntry={true} />
              <TextInput style={styles.textArea} inputMode='tel' placeholder='Phone Number' />
            </View>
            <View style={{ marginLeft: 15, }}>
              <Text style={[styles.bodyText]}>Address</Text>
              <TextInput style={styles.textArea} placeholder='Country' />
              <TextInput style={styles.textArea} placeholder='State' />
              <TextInput style={styles.textArea} placeholder='City' />
              <TextInput style={styles.textArea} placeholder='Street' />
              <TextInput style={styles.textArea} inputMode='numeric' placeholder='Zipcode' />
            </View>
          </View>
          <TouchableOpacity style={styles.buttonNewAccount}>
            <Icon
              name="person-add-outline"
              size={60}
              color="#03312E"
            />
            <Text style={styles.buttonNewAccountContent}>New Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D3D5D4',
    alignItems: "center",
    paddingBottom: 50,
  },
  header: {
    margin: 15,
    fontSize: 48,
    color: "#262626"
  },
  bodyText: {
    margin: 15,
    fontSize: 24,
    color: "#262626"
  },
  textArea: {
    margin: 15,
    fontSize: 24,
    backgroundColor: "#FFF",
    borderColor: "#03312E",
    borderWidth: 2,
    borderRadius: 10,
    minWidth: 250,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#03312E",
    padding: 10,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  buttonNewAccount: {
    flexDirection: "row",
    borderColor: "#03312E",
    borderWidth: 3,
    padding: 10,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  buttonNewAccountContent: {
    color: "#03312E",
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },
  buttonContent: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },

});