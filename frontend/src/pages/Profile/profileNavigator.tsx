import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from './profile';
import { Orders } from './orders';
import { Account } from './account';
import { Admin } from './Admin/admin';

const Stack = createNativeStackNavigator();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
  );
};
