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

  const LoginScreen = () => {
    return (
      <View>
        <Text style={[Layout.header]}>Login</Text>
          <Text style={[Layout.bodyText]}>
            Please login to see your profile.
          </Text>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.editBox]}
              placeholder='Email'
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.editBox]}
              placeholder='Password'
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
            />
          </View>
          {message && <Text style={[Layout.errorText]}>{message}</Text>}
          <Text style={[Layout.errorText]}>{loginError}</Text>
          <View style={styles.rowBottom}>
            <TouchableOpacity style={styles.buttonPrimary} onPressIn={(submit)}>
              <Text style={styles.btnFont}>Login</Text>
              <Icon name="log-in-outline" size={30} color="#FFF"/>
            </TouchableOpacity>
          </View>
      </View>
    )
  }

  const RegisterScreen = () => {
    return (
      <View>
        <Text style={[Layout.header]}>New here?</Text>
          <Text style={[Layout.bodyText]}>Please sign up!</Text>
          <View style={dimensions.width <= 800 ? styles.registrationContainerSmaller : styles.registrationContainer}>

            <View style={dimensions.width <= 800 ? styles.infoContainer : styles.infoContainerSmaller}>
              <Text style={[Layout.bodyText]}>Information</Text>

              <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.editBox} placeholder='Full Name'
                value={regName}
                onChangeText={(value) => setRegName(value)}
              />
              </View>
              <TextInput style={styles.editBox} inputMode='email' placeholder='Email'
                value={regEmail}
                onChangeText={(value) => setRegEmail(value)}
              />
              <TextInput style={styles.editBox} placeholder='Password' secureTextEntry={true}
                value={regPassword}
                onChangeText={(value) => setRegPassword(value)}
              />
              <TextInput style={styles.editBox} placeholder='Confirm Password' secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
              />
              <TextInput style={styles.editBox} inputMode='tel' placeholder='Phone Number'
                value={regPhone}
                onChangeText={(value) => setRegPhone(value)}
              />
            </View>

            <View style={dimensions.width <= 800 ? styles.addressContainerSmaller : styles.addressContainer}>
              <Text style={[Layout.bodyText]}>Address</Text>
              <TextInput style={styles.editBox} placeholder='Street'
                value={regAddress.street}
                onChangeText={(value) => onChangeAddress('street', value)}
              />
              <TextInput style={styles.editBox} placeholder='City'
                value={regAddress.city}
                onChangeText={(value) => onChangeAddress('city', value)}
              />
              <TextInput style={styles.editBox} placeholder='State'
                value={regAddress.state}
                onChangeText={(value) => onChangeAddress('state', value)}
              />
              <TextInput style={styles.editBox} inputMode='numeric' placeholder='Zipcode'
                value={regAddress.zip}
                onChangeText={(value) => onChangeAddress('zip', value)}
              />
              <TextInput style={styles.editBox} placeholder='Country'
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
    )
  }

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
        <LoginScreen/>

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
          <RegisterScreen/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonPrimary: {
    flexDirection: 'row',
    backgroundColor: '#477B61',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnFont: {
    fontSize: 18,
    paddingHorizontal: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#33333370',
    fontWeight: 'bold',
    position: 'relative',
    bottom: -30,
    left: 20
  }, 
  editBox: {
    paddingTop: 32,
    padding: 16,
    marginBottom: 20,
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,
    elevation: 1,
  },
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