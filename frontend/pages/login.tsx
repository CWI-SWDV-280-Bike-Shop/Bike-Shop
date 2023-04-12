import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Login = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.contentContainer]}>
        <Text style={[styles.header]}>Login</Text>
        <Text style={[styles.bodyText]}>
          Please login to see your profile.
        </Text>
        <TextInput style={[styles.textArea]} placeholder='Username' />
        <TextInput style={[styles.textArea]} placeholder='Password' secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Icon
            name="log-in-outline"
            size={60}
            color="#FFF"
          />
          <Text style={styles.buttonContent}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D3D5D4',
    alignItems: "center"
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
  buttonContent: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },

});