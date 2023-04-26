import AuthAPI from '@/api/auth.api';
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { AuthContext } from '@/context/auth.context';
import { User } from '@/types/data.types';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Layout from '@styles/layout/Layout';

export const Login = (props: DrawerHeaderProps) => {
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
      login({ email: email.toLowerCase(), password });
      props.navigation.navigate("Profile");
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
        email: regEmail.toLowerCase(),
        password: regPassword,
        phone: regPhone,
        address: regAddress,
        role,
      };
      // register user and then immediately login.
      AuthAPI.register(newUser).then(() => {
        login({ email: regEmail, password: regPassword });
        props.navigation.navigate("Profile");
      });
    }
  };

  return (
    <ScrollView style={[Layout.container]}>
      <View style={[Layout.contentContainer]}>
        <Text style={[Layout.header]}>Login</Text>
        <Text style={[Layout.bodyText]}>
          Please login to see your profile.
        </Text>
        <TextInput
          style={[Layout.textArea]}
          placeholder='Email'
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={[Layout.textArea]}
          placeholder='Password'
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
        />
        {message && <Text style={[Layout.errorText]}>{message}</Text>}
        <Text style={[Layout.errorText]}>{loginError}</Text>
        <TouchableOpacity
          style={Layout.button}
          onPressIn={(submit)}
        >
          <Icon
            name="log-in-outline"
            size={60}
            color="#FFF"
          />
          <Text style={Layout.buttonContent}> Login</Text>
        </TouchableOpacity>

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
        <View style={Layout.contentContainer}>
          <Text style={[Layout.header]}>New here?</Text>
          <Text style={[Layout.bodyText]}>Please sign up!</Text>
          <View style={dimensions.width <= 800 ? styles.registrationContainerSmaller : styles.registrationContainer}>

            <View style={dimensions.width <= 800 ? styles.infoContainer : styles.infoContainerSmaller}>
              <Text style={[Layout.bodyText]}>Information</Text>

              <TextInput style={Layout.textArea} placeholder='Full Name'
                value={regName}
                onChangeText={(value) => setRegName(value)}
              />
              <TextInput style={Layout.textArea} inputMode='email' placeholder='Email'
                value={regEmail}
                onChangeText={(value) => setRegEmail(value)}
              />
              <TextInput style={Layout.textArea} placeholder='Password' secureTextEntry={true}
                value={regPassword}
                onChangeText={(value) => setRegPassword(value)}
              />
              <TextInput style={Layout.textArea} placeholder='Confirm Password' secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
              />
              <TextInput style={Layout.textArea} inputMode='tel' placeholder='Phone Number'
                value={regPhone}
                onChangeText={(value) => setRegPhone(value)}
              />
            </View>

            <View style={dimensions.width <= 800 ? styles.addressContainerSmaller : styles.addressContainer}>
              <Text style={[Layout.bodyText]}>Address</Text>
              <TextInput style={Layout.textArea} placeholder='Street'
                value={regAddress.street}
                onChangeText={(value) => onChangeAddress('street', value)}
              />
              <TextInput style={Layout.textArea} placeholder='City'
                value={regAddress.city}
                onChangeText={(value) => onChangeAddress('city', value)}
              />
              <TextInput style={Layout.textArea} placeholder='State'
                value={regAddress.state}
                onChangeText={(value) => onChangeAddress('state', value)}
              />
              <TextInput style={Layout.textArea} inputMode='numeric' placeholder='Zipcode'
                value={regAddress.zip}
                onChangeText={(value) => onChangeAddress('zip', value)}
              />
              <TextInput style={Layout.textArea} placeholder='Country'
                value={regAddress.country}
                onChangeText={(value) => onChangeAddress('country', value)}
              />
            </View>

          </View>
          {message && <Text style={[Layout.errorText]}>{message}</Text>}
          <Text style={[Layout.errorText]}>{errorMessage}</Text>
          <TouchableOpacity style={Layout.button}
            onPressIn={regSubmit}
          >
            <Icon
              name="person-add-outline"
              size={60}
              color="#FFF"
            />
            <Text style={Layout.buttonContent}>New Account</Text>
          </TouchableOpacity>

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
    marginLeft: 0,
  },
  addressContainer: {
    marginLeft: 0,
  },
  registrationContainer: {
    flex: 1,
    flexDirection: "row"
  },
  infoContainerSmaller: {
    marginRight: 0
  },
  addressContainerSmaller: {
    marginLeft: 0
  },
  registrationContainerSmaller: {
    flex: 1,
    flexDirection: "column",
  },
});