


import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';

// Card component import
import { ItemCard } from '../../../components/Cards/ItemCards';

//Footer Import 
import { Footer } from '../../../components/Footer';

const filter = ["Price: Low to High", "Price: High to Low", "Ratings: High to Low"];
const sort = ["Price: Low to High", "Price: High to Low", "Ratings: High to Low"];

export const Bikes = () => {
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
          <SelectDropdown 
            data={filter}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }} 
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }} 
          />
          </View>
          <Text>
            Sort by:
          </Text>
          <SelectDropdown
            data={sort}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
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
              brakes={'Disc Brakes'}
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
              brakes={'Disc Brakes'}
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
              brakes={'Disc Brakes'}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default Bikes;

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
    flexDirection: 'column',
    flex: 0.5
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
