import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Styles from '../../../Styles';
import { AuthContext } from '../../../context/auth.context';

const Login = () => {
  const { authUser, isLoggedIn, login, message } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login({ email, password });
  };

  return (
    <View style={Styles.subsection}>
      <Text style={Styles.subtitle}>Login</Text>

      <Text>Email</Text>
      <TextInput
        style={Styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Text>Password</Text>
      <TextInput
        style={Styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />
      <Button title="Submit" onPress={handleSubmit}></Button>

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
  );
};

export default Login;
