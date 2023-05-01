import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '@/context/auth.context';
import { LoginScreen, RegisterScreen } from '../login';
import { DrawerHeaderProps } from '@react-navigation/drawer';

const Checkout = (props: DrawerHeaderProps) => {
	const { authUser } = useContext(AuthContext);
	const [register, setRegister] = useState(false);

	return !authUser ? (
		<View>
			<Button title="Login" onPress={() => setRegister(false)} />
			<Text>OR</Text>
			<Button title="Register" onPress={() => setRegister(true)} />
			{register ? (
				<RegisterScreen props={props} />
			) : (
				<LoginScreen props={props} />
			)}
		</View>
	) : (
		<View>
			<Text>Checkout</Text>
		</View>
	);
};

export default Checkout;
