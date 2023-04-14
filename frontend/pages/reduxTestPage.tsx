import React from 'react';
import { ScrollView, Text } from 'react-native';
import Styles from '../Styles';
import { Auth, Bikes } from '../Components/Redux';
import { AuthSection } from '../Components/ContextAPI';

export const ReduxTestPage = () => {
  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>Redux Test Page</Text>
      <AuthSection />
      <Auth />
      <Bikes />
    </ScrollView>
  );
};
