import AuthAPI from '@/api/auth.api';
import { AuthContext } from '@/context/auth.context';
import { User } from '@/types/data.types';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Login = () => {
  //Window Dimensions
  const dimensions = useWindowDimensions();
  //Auth connection
  const { authUser, isLoggedIn, login, message } = useContext(AuthContext);
  //Login Logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const submit = () => {
    if (email == '' || password == "") {
      setLoginError('Please fill out all the fields!');
    } else {
      login({ email, password });
    }
  };
  //Register Logic
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [regAddress, setRegAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [role, setRole] = useState('Customer'); //setting default role... this is kinda sloppy

  const onChangeAddress = (fieldName: string, value: string) => {
    setRegAddress({ ...regAddress, [fieldName]: value });
  };

  const regSubmit = () => {
    if (regName == '' || regEmail == '' || regPassword == '' || regPhone == '') {
      setErrorMessage('One or more fields are not filled!');
    } else if (confirmPassword != regPassword) {
      setErrorMessage('Password and Confirm Password must match!');
    } else if (regAddress.city == '' || regAddress.country == "" || regAddress.state == '' || regAddress.street == '' || regAddress.zip == '') {
      setErrorMessage('Please fill in your whole address.');
    } else {
      setErrorMessage('');
      // register user and then immediately login.
      const newUser: User = {
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone,
        address: regAddress,
        role,
      };
      // register user and then immediately login.
      AuthAPI.register(newUser).then(() => login({ email: regEmail, password: regPassword }));
    }
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.contentContainer]}>
        <Text style={[styles.header]}>Login</Text>
        <Text style={[styles.bodyText]}>
          Please login to see your profile.
        </Text>
        <TextInput
          style={[styles.textArea]}
          placeholder='Email'
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={[styles.textArea]}
          placeholder='Password'
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
        />
        <Text style={[styles.errorText]}>{loginError}</Text>
        <TouchableOpacity
          style={styles.button}
          onPressIn={(submit)}
        >
          <Icon
            name="log-in-outline"
            size={60}
            color="#FFF"
          />
          <Text style={styles.buttonContent}> Login</Text>
        </TouchableOpacity>
        {message && <Text>{message}</Text>}

        {isLoggedIn && (
          <View>
            <Text>_id: {authUser._id}</Text>
            <Text>name: {authUser.name}</Text>
            <Text>email: {authUser.email}</Text>
            <Text>role: {authUser.role}</Text>
            <Text>accessToken: {authUser.accessToken}</Text>
            <Text>refreshToken: {authUser.refreshToken}</Text>
          </View>
        )}
        <View style={styles.contentContainer}>
          <Text style={[styles.header]}>New here? Please sign up!</Text>
          <View style={dimensions.width <= 800 ? styles.registrationContainerSmaller : styles.registrationContainer}>

            <View style={dimensions.width <= 800 ? styles.infoContainer : styles.infoContainerSmaller}>
              <Text style={[styles.bodyText]}>Information</Text>
              <TextInput style={styles.textArea} placeholder='Full Name'
                value={regName}
                onChangeText={(value) => setRegName(value)}
              />
              <TextInput style={styles.textArea} inputMode='email' placeholder='Email'
                value={regEmail}
                onChangeText={(value) => setRegEmail(value)}
              />
              <TextInput style={styles.textArea} placeholder='Password' secureTextEntry={true}
                value={regPassword}
                onChangeText={(value) => setRegPassword(value)}
              />
              <TextInput style={styles.textArea} placeholder='Confirm Password' secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
              />
              <TextInput style={styles.textArea} inputMode='tel' placeholder='Phone Number'
                value={regPhone}
                onChangeText={(value) => setRegPhone(value)}
              />
            </View>

            <View style={dimensions.width <= 800 ? styles.addressContainerSmaller : styles.addressContainer}>
              <Text style={[styles.bodyText]}>Address</Text>
              <TextInput style={styles.textArea} placeholder='Country'
                value={regAddress.country}
                onChangeText={(value) => onChangeAddress('country', value)}
              />
              <TextInput style={styles.textArea} placeholder='State'
                value={regAddress.state}
                onChangeText={(value) => onChangeAddress('state', value)}
              />
              <TextInput style={styles.textArea} placeholder='City'
                value={regAddress.city}
                onChangeText={(value) => onChangeAddress('city', value)}
              />
              <TextInput style={styles.textArea} placeholder='Street'
                value={regAddress.street}
                onChangeText={(value) => onChangeAddress('street', value)}
              />
              <TextInput style={styles.textArea} inputMode='numeric' placeholder='Zipcode'
                value={regAddress.zip}
                onChangeText={(value) => onChangeAddress('zip', value)}
              />
            </View>

          </View>
          <Text style={[styles.errorText]}>{errorMessage}</Text>
          <TouchableOpacity style={styles.buttonNewAccount}
            onPressIn={regSubmit}
          >
            <Icon
              name="person-add-outline"
              size={60}
              color="#03312E"
            />
            <Text style={styles.buttonNewAccountContent}>New Account</Text>
          </TouchableOpacity>
          {message && <Text>{message}</Text>}

          {isLoggedIn && (
            <View>
              <Text>_id: {authUser._id}</Text>
              <Text>name: {authUser.name}</Text>
              <Text>email: {authUser.email}</Text>
              <Text>role: {authUser.role}</Text>
              <Text>accessToken: {authUser.accessToken}</Text>
              <Text>refreshToken: {authUser.refreshToken}</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginRight: 15,
  },
  addressContainer: {
    marginLeft: 15,
  },
  registrationContainer: {
    flex: 1,
    flexDirection: "row"
  },
  infoContainerSmaller:{
    marginRight: 0
  },
  addressContainerSmaller:{
    marginLeft: 0
  },
  registrationContainerSmaller:{
    flex:1,
    flexDirection: "column",
  },
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
    marginTop: 10,
    fontSize: 45,
    color: "#262626",
    textAlign: 'center',
  },
  header2: {
    marginBottom: 10,
    fontSize: 35,
    color: "#262626",
    textAlign: 'center',
  },
  bodyText: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 24,
    color: "#262626",
    textAlign: "center",
  },
  errorText: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 24,
    color: "#dc143c",
    textAlign: "center",
  },
  textArea: {
    margin: 15,
    fontSize: 24,
    backgroundColor: "#FFF",
    borderColor: "#03312E",
    borderWidth: 2,
    borderRadius: 10,
    minWidth: 300,
    padding: 5,
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
});