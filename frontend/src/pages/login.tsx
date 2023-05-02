import AuthAPI from '@/api/auth.api';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { AuthContext } from '@/context/auth.context';
import { User } from '@/types/data.types';
import * as React from 'react';
import { useContext, useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	useWindowDimensions,
	Button,
} from 'react-native';
import {
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Layout from '@styles/layout/Layout';
import { InputModeOptions } from 'react-native';

export const LoginScreen = ({ props }: { props: DrawerHeaderProps }) => {
  //Auth connection
  const { authUser, login, message } = useContext(AuthContext);
  //Login Logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

	const submit = () => {
		if (email == '' || password == '') {
			setLoginError('Please fill out all the fields!');
		} else {
			login({ email: email.toLowerCase(), password });
		}
	};
	return (
		<View>
			<Text style={[Layout.header]}>Login</Text>
			<Text style={[Layout.bodyText]}>Please login to see your profile.</Text>
			<View>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={[Layout.input]}
					placeholder="Email"
					value={email}
					onChangeText={(value) => setEmail(value)}
				/>
			</View>
			<View>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={[Layout.input]}
					placeholder="Password"
					value={password}
					onChangeText={(value) => setPassword(value)}
					secureTextEntry={true}
				/>
			</View>
			{message && <Text style={[Layout.errorText]}>{message}</Text>}
			<Text style={[Layout.errorText]}>{loginError}</Text>
			<View style={styles.rowBottom}>
				<TouchableOpacity style={Layout.button} onPressIn={submit}>
					<Text style={styles.btnFont}>Login</Text>
					<Icon name="log-in-outline" size={30} color="#FFF" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const RegisterScreen = ({ props }: { props: DrawerHeaderProps }) => {
	//Window Dimensions
	const dimensions = useWindowDimensions();
	//Auth connection
	const { authUser, login, message } = useContext(AuthContext);
	const [role, setRole] = useState('Customer'); //setting default role... this is kinda sloppy

	const regSubmit = () => {
		if (
			regName == '' ||
			regEmail == '' ||
			regPassword == '' ||
			regPhone == ''
		) {
			setErrorMessage('One or more fields are not filled!');
		} else if (confirmPassword != regPassword) {
			setErrorMessage('Password and Confirm Password must match!');
		} else if (
			regAddress.city == '' ||
			regAddress.country == '' ||
			regAddress.state == '' ||
			regAddress.street == '' ||
			regAddress.zipcode == ''
		) {
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
			});
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
		zipcode: '',
		country: '',
	});

	const onChangeAddress = (fieldName: string, value: string) => {
		setRegAddress({ ...regAddress, [fieldName]: value });
	};
	const formInfo = [
		{
			label: 'Full Name',
			stateValue: regName,
			setState: setRegName,
		},
		{
			label: 'Email',
			inputMode: 'email',
			stateValue: regEmail,
			setState: setRegEmail,
		},
		{
			label: 'Password',
			stateValue: regPassword,
			setState: setRegPassword,
		},
		{
			label: 'Confirm Password',
			stateValue: confirmPassword,
			setState: setConfirmPassword,
		},
		{
			label: 'Phone',
			inputMode: 'tel',
			stateValue: regPhone,
			setState: setRegPhone,
		},
	];
	const formAddr = [
		{
			label: 'Street',
			stateValue: regAddress.street,
		},
		{
			label: 'City',
			stateValue: regAddress.city,
		},
		{
			label: 'State',
			stateValue: regAddress.state,
		},
		{
			label: 'Zipcode',
			inputMode: 'numeric',
			stateValue: regAddress.zipcode,
		},
		{
			label: 'Country',
			stateValue: regAddress.country,
		},
	];
	return (
		<View>
			<Text style={[Layout.header]}>New here?</Text>
			<Text style={[Layout.bodyText]}>Please sign up!</Text>
			<View
				style={
					dimensions.width <= 800
						? styles.registrationContainerSmaller
						: styles.registrationContainer
				}
			>
				<View
					style={
						dimensions.width <= 800
							? styles.infoContainer
							: styles.infoContainerSmaller
					}
				>
					<Text style={[Layout.bodyText]}>Information</Text>

					{formInfo.map((item, i) => (
						<View key={i}>
							<Text style={styles.label}>{item.label}</Text>
							<TextInput
								style={Layout.input}
								inputMode={item.inputMode as InputModeOptions}
								placeholder={''}
								value={item.stateValue}
								onChangeText={(value) => item.setState(value)}
							/>
						</View>
					))}
				</View>

				<View
					style={
						dimensions.width <= 800
							? styles.addressContainerSmaller
							: styles.addressContainer
					}
				>
					<Text style={[Layout.bodyText]}>Address</Text>
					{formAddr.map((item, i) => (
						<View key={i}>
							<Text style={styles.label}>{item.label}</Text>
							<TextInput
								style={Layout.input}
								inputMode={item.inputMode as InputModeOptions}
								placeholder={''}
								value={item.stateValue}
								onChangeText={(value) =>
									onChangeAddress(item.label.toLowerCase(), value)
								}
							/>
						</View>
					))}
				</View>
			</View>
			{message && <Text style={[Layout.errorText]}>{message}</Text>}
			<Text style={[Layout.errorText]}>{errorMessage}</Text>
			<View style={styles.rowBottom}>
				<TouchableOpacity style={Layout.button} onPressIn={regSubmit}>
					<Icon name="person-add-outline" size={30} color="#FFF" />
					<Text style={styles.btnFont}>Register Account</Text>
				</TouchableOpacity>
			</View>

			{authUser && (
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
	);
};

export const Login = (props: DrawerHeaderProps) => {
	//Auth connection
	const { authUser } = useContext(AuthContext);

	return (
		<ScrollView style={[Layout.container]}>
			<View style={[Layout.contentContainer]}>
				<LoginScreen props={props} />
				{authUser && (
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
					<RegisterScreen props={props} />
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
		left: 20,
	},
	// editBox: {
	// 	paddingTop: 32,
	// 	padding: 16,
	// 	marginBottom: 20,
	// 	margin: 5,
	// 	borderRadius: 10,
	// 	shadowColor: '#000',
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 1,
	// 	},
	// 	shadowOpacity: 0.42,
	// 	shadowRadius: 2.22,
	// 	elevation: 1,
	// },
	infoContainer: {
		marginLeft: 0,
	},
	addressContainer: {
		marginLeft: 0,
	},
	registrationContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	infoContainerSmaller: {
		marginRight: 0,
	},
	addressContainerSmaller: {
		marginLeft: 0,
	},
	registrationContainerSmaller: {
		flex: 1,
		flexDirection: 'column',
	},
});
