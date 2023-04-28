import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from './profile';
import { Orders } from './orders';
import { Account } from './account';
import { Admin } from './Admin/admin';
import { ScaledSize } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export const ProfileNavigator = ({dimensions} : {dimensions : ScaledSize}) => {
  return (
  <NavigationContainer independent={true}>
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#fff" },
      }}>
      <Stack.Screen
        name="Options"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Admin">
            {props => <Admin {...props} dimensions={dimensions} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );
};
