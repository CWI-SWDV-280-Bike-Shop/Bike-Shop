import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Styles from '../../../Styles';
import AuthContext from '../../../context/auth.context';

const Login = () => {
  const { AuthUser, isLoggedIn, login } = useContext(AuthContext);
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

      {isLoggedIn && (
        <View>
          <Text>_id: {AuthUser.id}</Text>
          <Text>name: {AuthUser.name}</Text>
          <Text>email: {AuthUser.email}</Text>
          <Text>role: {AuthUser.role}</Text>
          <Text>accessToken: {AuthUser.accessToken}</Text>
          <Text>refreshToken: {AuthUser.refreshToken}</Text>
        </View>
      )}
    </View>
  );
};

export default Login;
