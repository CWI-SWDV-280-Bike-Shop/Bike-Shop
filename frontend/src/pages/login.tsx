import AuthAPI from '@/api/auth.api';
import { AuthContext } from '@/context/auth.context';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Login = () => {
  //Auth connection
  const { authUser, isLoggedIn, login, message } = useContext(AuthContext);
  //Login Logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    login({ email, password });
  };
  //Register Logic
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
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
    // register user and then immediately login.
    AuthAPI.register({ name: regName, email: regEmail, password: regPassword, phone: regPhone, address: regAddress, role }).then(() =>
      login({ email: regEmail, password: regPassword })
    );
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
            <Text>_id: {authUser.id}</Text>
            <Text>name: {authUser.name}</Text>
            <Text>email: {authUser.email}</Text>
            <Text>role: {authUser.role}</Text>
            <Text>accessToken: {authUser.accessToken}</Text>
            <Text>refreshToken: {authUser.refreshToken}</Text>
          </View>
        )}
        <View style={styles.contentContainer}>
          <Text style={[styles.header]}>New here? Please sign up!</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>

            <View style={{ marginRight: 15, }}>
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
              //TODO add logic for confirming password
              />
              <TextInput style={styles.textArea} inputMode='tel' placeholder='Phone Number'
                value={regPhone}
                onChangeText={(value) => setRegPhone(value)}
              />
            </View>

            <View style={{ marginLeft: 15, }}>
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
          <TouchableOpacity style={styles.buttonNewAccount}
            onPressIn={regSubmit}
          >
            <Icon
              name="person-add-outline"
              size={60}
              color="#FFFFFF"
            />
            <Text style={styles.buttonNewAccountContent}>New Account</Text>
          </TouchableOpacity>
          {message && <Text>{message}</Text>}

          {isLoggedIn && (
            <View>
              <Text>_id: {authUser.id}</Text>
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
    color: "#262626"
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