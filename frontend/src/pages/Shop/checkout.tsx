import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '@/context/auth.context';
import { LoginScreen } from '../login';
import { DrawerHeaderProps } from '@react-navigation/drawer';

const Checkout = (props: DrawerHeaderProps) => {
	const { authUser } = useContext(AuthContext);

	return !authUser ? (
		<View>
			<LoginScreen props={props} />
		</View>
	) : (
		<View>
			<Text>Checkout</Text>
		</View>
	);
};

export default Checkout;
