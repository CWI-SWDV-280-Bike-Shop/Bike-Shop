import 'react-native-gesture-handler';
import * as React from 'react';
import { AuthProvider } from '@context/auth.context';
import { ShopProvider } from '@/context/shop.context';
import AppWrapper from '@/AppWrapper';
import Shop from '@/pages/Shop/shop';

const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <AppWrapper />
      </ShopProvider>
    </AuthProvider>
  );
};

export default App;
