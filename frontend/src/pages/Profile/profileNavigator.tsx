import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from './profile';
import { Orders } from './orders';
import { Account } from './account';
import { Admin } from './Admin/admin';
import { ScaledSize } from 'react-native';

const Stack = createNativeStackNavigator();

export const ProfileNavigator = ({dimensions} : {dimensions : ScaledSize}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Admin">
            {props => <Admin {...props} dimensions={dimensions} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
