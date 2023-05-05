import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '@styles/layout/Layout';
import ProductAPI from '@api/product.api';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Product } from '@/types/data.types';

export const FilterParams = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setimage] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [wheelSize, setWheelSize] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = async () => {
    const params: Product = {
      description,
      category,
      subcategory,
      price,
      images,
      inStock,
      brand,
      material,
      wheelSize,
      color,
      size,
    };
    useEffect(() => {
      ProductAPI.getAll(params).then((res) => setProducts(res.data));
    }, []);
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductAPI.getAll().then((res) => setProducts(res.data));
  }, []);

  return (
    <View style={[styles.filter]}>
      <Text>Filter by:</Text>
      <Picker
        style={Layout.input}
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
      >
        <Picker.Item label="-Select Category-" />
        <Picker.Item label="Bikes" value="Bikes" />
        <Picker.Item label="Accessories" value="Accessories" />
        <Picker.Item label="Services" value="Services" />
      </Picker>
      {category === 'Bikes' && (
        <>
          <Text>Subcategory</Text>
          <Picker
            style={Layout.input}
            selectedValue={subcategory}
            onValueChange={(value) => setSubcategory(value)}
          >
            <Picker.Item label="-Select Bike Subcategory-" />
            <Picker.Item label="Mountain" value="Mountain" />
            <Picker.Item label="Electric" value="Electric" />
            <Picker.Item label="Street" value="Street" />
          </Picker>

          <Text>Material</Text>
          <Picker
            style={Layout.input}
            selectedValue={material}
            onValueChange={(value) => setMaterial(value)}
          >
            <Picker.Item label="Aluminum" value="Aluminum"></Picker.Item>
            <Picker.Item label="Steel" value="Steel"></Picker.Item>
            <Picker.Item label="Carbon" value="Carbon"></Picker.Item>
          </Picker>

          <Text>Wheel Size</Text>
          <Picker
            style={Layout.input}
            selectedValue={wheelSize}
            onValueChange={(value) => setWheelSize(value)}
          >
            <Picker.Item label="20&rdquo;" value="20in"></Picker.Item>
            <Picker.Item label="24&rdquo;" value="24in"></Picker.Item>
            <Picker.Item label="26&rdquo;" value="26in"></Picker.Item>
            <Picker.Item label="27.5&rdquo;" value="27.5in"></Picker.Item>
            <Picker.Item label="29&rdquo;" value="29in"></Picker.Item>
            <Picker.Item label="700c" value="700c"></Picker.Item>
            <Picker.Item label="650b" value="650b"></Picker.Item>
          </Picker>

          <Text>Color</Text>
          <Picker
            style={Layout.input}
            selectedValue={color}
            onValueChange={(value) => setColor(value)}
          >
            <Picker.Item label="Red" value="Red"></Picker.Item>
            <Picker.Item label="Orange" value="Orange"></Picker.Item>
            <Picker.Item label="Yellow" value="Yellow"></Picker.Item>
            <Picker.Item label="Green" value="Green"></Picker.Item>
            <Picker.Item label="Blue" value="Blue"></Picker.Item>
            <Picker.Item label="Purple" value="Purple"></Picker.Item>
            <Picker.Item label="Black" value="Black"></Picker.Item>
            <Picker.Item label="White" value="White"></Picker.Item>
            <Picker.Item label="Grey" value="Grey"></Picker.Item>
          </Picker>

          <Text>Size</Text>
          <Picker
            style={Layout.input}
            selectedValue={size}
            onValueChange={(value) => setSize(value)}
          >
            <Picker.Item label="Small" value="Small"></Picker.Item>
            <Picker.Item label="Medium" value="Medium"></Picker.Item>
            <Picker.Item label="Large" value="Large"></Picker.Item>
          </Picker>
        </>
      )}
      {category === 'Accessories' && (
        <>
          <Text>Subcategory</Text>
          <Picker
            style={Layout.input}
            selectedValue={subcategory}
            onValueChange={(value) => setSubcategory(value)}
          >
            <Picker.Item label="-Select Accesssory Subcategory-" />
            <Picker.Item label="Tires" value="Tires" />
            <Picker.Item label="Brakes" value="Brakes" />
            <Picker.Item label="Lights" value="Lights" />
            <Picker.Item label="Frames" value="Frames" />
            <Picker.Item label="Chains" value="Chains" />
            <Picker.Item label="Pedals" value="Pedals" />
            <Picker.Item label="Tubes" value="Tubes" />
          </Picker>
        </>
      )}
      {category === 'Services' && (
        <>
          <Text>Subcategory</Text>
          <Picker
            style={Layout.input}
            selectedValue={subcategory}
            onValueChange={(value) => setSubcategory(value)}
          >
            <Picker.Item label="-Select Service Subcategory-" />
            <Picker.Item label="Tune" value="Tune" />
            <Picker.Item
              label="Wheel and Tire Maintenance"
              value="Wheel and Tire Maintenance"
            />
            <Picker.Item label="Assembly" value="Assembly" />
            <Picker.Item
              label="Shifting and Brakes"
              value="Shifting and Brakes"
            />
          </Picker>
        </>
      )}
      <Text>Sort by:</Text>
      <Picker style={Layout.input}>
        <Picker.Item label="Price: Low to High" value="PLH"></Picker.Item>
        <Picker.Item label="Price: High to Low" value="PHL"></Picker.Item>
        <Picker.Item label="Ratings: High to Low" value="RHL"></Picker.Item>
      </Picker>
      <TouchableOpacity style={[styles.submitButton]}>
        <Text style={[styles.submitButtonText]} onPress={handleSubmit}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#62929E',
    padding: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
});

export default FilterParams;
