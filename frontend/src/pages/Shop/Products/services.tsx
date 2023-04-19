


import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';

// Card component import
import { ItemCard } from '../../../components/Cards/ItemCards';

//Footer Import 
import { Footer } from '../../../components/Footer';

export const Services = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={[styles.searchbar]}>
          <Text>
            Here is the search bar
          </Text>
        </View>
        <View style={[styles.number]}>
          <Text>
            Showing 1 - 25 out of 100
          </Text>
        </View>
        <View style={[styles.sortby]}>
          <Text>
            Filter by:
          </Text>
          <View>
            <Picker style={Layout.input}>
              <Picker.Item label="Helmets" value="Helmets"></Picker.Item>
              <Picker.Item label="Pedals" value="Pedals"></Picker.Item>
              <Picker.Item label="Grips" value="Grips"></Picker.Item>
              <Picker.Item label="Chains" value="Chains"></Picker.Item>
              <Picker.Item label="Tires" value="Tires"></Picker.Item>
              <Picker.Item label="Tubes" value="Tubes"></Picker.Item>
              <Picker.Item label="Lights" value="Lights"></Picker.Item>
              <Picker.Item label="Brakes" value="Brakes"></Picker.Item>
            </Picker>
          </View>
          <Text>
            Sort by:
          </Text>
          <Picker style={Layout.input}>
              <Picker.Item label="Price: Low to High" value="PLH"></Picker.Item>
              <Picker.Item label="Price: High to Low" value="PHL"></Picker.Item>
              <Picker.Item label="Ratings: High to Low" value="RHL"></Picker.Item>
            </Picker>
        </View>
        <View style={[styles.cardContainer]}>
          <View style={[styles.cards]}>
             <ItemCard
              name={'City Bike'}
              price={
                '$300.00'
              }
              imgSrc={require('../../../assets/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
            />
            <ItemCard
              name={'City Bike'}
              price={
                '$300.00'
              }
              imgSrc={require('../../../assets/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
            />
            <ItemCard
              name={'City Bike'}
              price={
                '$300.00'
              }
              imgSrc={require('../../../assets/Images/citybikestockimg.png')}
              btnName={'Add to Cart'}
              stockStatus={'IN STOCK'}
              color={'Yellow/Black'}
              size={'58 CM'}
            /> 
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchbar: {
    flex: 0.5
  },
  number: {
    flex: 0.5
  },
  sortby: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.75, 
  },
  cards: {
    flexDirection: 'column',
    gap: 8,
    flex: 1,
    padding: 15
  },
  cardContainer: {
    flex: 15,
    backgroundColor: '#D3D5D4',
  },
  header: {
    margin: 20,
    fontSize: 48,
    color: "#262626"
  },
  bodyText: {
    marginHorizontal: 20,
    fontSize: 24,
    color: "#262626"
  },
});