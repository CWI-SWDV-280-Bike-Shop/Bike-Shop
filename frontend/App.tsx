import * as React from 'react';
import { AuthProvider } from '@context/auth.context';
import AppWrapper from '@/AppWrapper';

const App = () => {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
};

export default App;