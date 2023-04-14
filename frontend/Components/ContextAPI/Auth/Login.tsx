import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Styles from '../../../Styles';
import { AuthContext } from '../../../context/auth.context';

export const Login = () => {
  const { user, isLoggedIn, login } = useContext(AuthContext);
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
          <Text>_id: {user.id}</Text>
          <Text>name: {user.name}</Text>
          <Text>email: {user.email}</Text>
          <Text>role: {user.role}</Text>
          <Text>accessToken: {user.accessToken}</Text>
          <Text>refreshToken: {user.refreshToken}</Text>
        </View>
      )}
    </View>
  );
};
