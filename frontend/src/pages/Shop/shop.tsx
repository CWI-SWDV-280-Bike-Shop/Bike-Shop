import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import BikeCards from '@components/Cards/BikeCards'

// Card component import
import { ItemCard } from '@components/Cards/ItemCards';

//Footer Import 
import { Footer } from '@components/Footer';

export const Shop = () => {
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
          <Picker style={Layout.input}>
            <Picker.Item label="Mountain" value="Mountain"></Picker.Item>
            <Picker.Item label="Electric" value="Electric"></Picker.Item>
            <Picker.Item label="Street" value="Street"></Picker.Item>
          </Picker>
          <Text>
            Sort by:
          </Text>
          <Picker style={Layout.input}>
            <Picker.Item label="Price: Low to High" value="PLH"></Picker.Item>
            <Picker.Item label="Price: High to Low" value="PHL"></Picker.Item>
            <Picker.Item label="Ratings: High to Low" value="RHL"></Picker.Item>
          </Picker>
          <Text>
            Material:
          </Text>
          <Picker style={Layout.input}>
            <Picker.Item label="Aluminum" value="Aluminum"></Picker.Item>
            <Picker.Item label="Steel" value="Steel"></Picker.Item>
            <Picker.Item label="Carbon" value="Carbon"></Picker.Item>
          </Picker>
          <Text>
            Wheel Size:
          </Text>
          <Picker style={Layout.input}>
            <Picker.Item label="20&rdquo;" value="20in"></Picker.Item>
            <Picker.Item label="24&rdquo;" value="24in"></Picker.Item>
            <Picker.Item label="26&rdquo;" value="26in"></Picker.Item>
            <Picker.Item label="27.5&rdquo;" value="27.5in"></Picker.Item>
            <Picker.Item label="29&rdquo;" value="29in"></Picker.Item>
            <Picker.Item label="700c" value="700c"></Picker.Item>
            <Picker.Item label="650b" value="650b"></Picker.Item>
          </Picker>
          <Text>
            Color:
          </Text>
          <Picker style={Layout.input}>
            <Picker.Item label="Red" value="Red"></Picker.Item>
            <Picker.Item label="Orange" value="Orange"></Picker.Item>
            <Picker.Item label="Yellow" value="Yellow"></Picker.Item>
            <Picker.Item label="Green" value="Green"></Picker.Item>
            <Picker.Item label="Blue" value="Blue"></Picker.Item>
            <Picker.Item label="Purple" value="Purple"></Picker.Item>
            <Picker.Item label="Black" value="Black"></Picker.Item>
            <Picker.Item label="White" value="White"></Picker.Item>
            <Picker.Item label="Grey" value="Grey"></Picker.Item>
            <Picker.Item label="Pink" value="Pink"></Picker.Item>
          </Picker>
          <Text>
            Size:
          </Text>
          <Picker style={Layout.input}>
            <Picker.Item label="Small" value="Small"></Picker.Item>
            <Picker.Item label="Medium" value="Medium"></Picker.Item>
            <Picker.Item label="Large" value="Large"></Picker.Item>
          </Picker>
          <Text>
            Gender:
          </Text>
          <Picker style={Layout.input}>
            <Picker.Item label="Mens" value="Mens"></Picker.Item>
            <Picker.Item label="Womens" value="Womens"></Picker.Item>
            <Picker.Item label="Neutral" value="Neutral"></Picker.Item>
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

export default Shop;

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
