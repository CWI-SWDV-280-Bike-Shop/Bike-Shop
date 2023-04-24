import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import { Product } from '@/types/data.types';
import ProductAPI from '@/api/product.api';
import { formatPrice } from '@/utilities/formatter';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Styles';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState(0);
  const [imageIds, setImageIds] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [wheelSize, setWheelSize] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState({} as Product);

  const handleSubmit = async () => {
    const newProduct: Product = {
      name,
      description,
      category,
      subcategory,
      price,
      imageIds,
      inStock,
      brand,
      material,
      wheelSize,
      color,
      size,
      gender,
    };
    ProductAPI.create(newProduct).then((res) => setProduct(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add Product</Text>

      <Text>Name</Text>
      <TextInput
        style={Layout.input}
        value={name}
        onChangeText={setName}
      ></TextInput>

      <Text>Description</Text>
      <TextInput
        style={Layout.input}
        value={description}
        onChangeText={(value) => setDescription(value)}
      ></TextInput>

      <Text>Category</Text>
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

      <Text>Price</Text>
      <TextInput
        style={Layout.input}
        value={price.toString()}
        onChangeText={(value) => setPrice(Number(value))}
      ></TextInput>

      <Text>In Stock?</Text>
      <Picker
        style={Layout.input}
        selectedValue={inStock}
        onValueChange={(value) => setInStock(value)}
      >
        <Picker.Item label="true" value={true} />
        <Picker.Item label="false" value={false} />
      </Picker>

      {category === 'Bikes' && (
        <>
          <Text>Brand</Text>
          <TextInput
            style={Layout.input}
            value={brand}
            onChangeText={(value) => setBrand(value)}
          ></TextInput>

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
            <Picker.Item label="20in" value="20in"></Picker.Item>
            <Picker.Item label="24in" value="24in"></Picker.Item>
            <Picker.Item label="26in" value="26in"></Picker.Item>
            <Picker.Item label="27.5in" value="27.5in"></Picker.Item>
            <Picker.Item label="29in" value="29in"></Picker.Item>
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

          <Text>Gender</Text>
          <Picker
            style={Layout.input}
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
          >
            <Picker.Item label="Mens" value="Mens"></Picker.Item>
            <Picker.Item label="Womens" value="Womens"></Picker.Item>
            <Picker.Item label="Neutral" value="Neutral"></Picker.Item>
          </Picker>
        </>
      )}

      <Text>Image Upload: {'TODO'}</Text>

      <Button title="submit" onPress={handleSubmit} />

      {submitted && (
        <View>
          <Text>id: {product?._id}</Text>
          <Text>name: {product?.name}</Text>
          <Text>description: {product?.description}</Text>
          <Text>category: {product?.category}</Text>
          <Text>subcategory: {product?.subcategory}</Text>
          <Text>price: {formatPrice(product?.price)}</Text>
          <Text>imageIds: {product?.imageIds}</Text>
          <Text>inStock: {product?.inStock?.toString()}</Text>
          {product?.category === 'Bikes' && (
            <>
              <Text>brand: {product?.brand}</Text>
              <Text>material: {product?.material}</Text>
              <Text>wheelSize: {product?.wheelSize}</Text>
              <Text>color: {product?.color}</Text>
              <Text>size: {product?.size}</Text>
              <Text>gender: {product?.gender}</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const EditProduct = ({ product, visible, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState(0);
  const [imageIds, setImageIds] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [wheelSize, setWheelSize] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    // make sure product is NOT undefined, then if a given attribute (name, description, etc.)
    // is undefined, set it to an empty string, otherwise the TextInput throws console errors
    // because of the `value` being undefined
    if (product) {
      setName(product?.name || '');
      setDescription(product?.description);
      setCategory(product?.category);
      setSubcategory(product?.subcategory);
      setPrice(product?.price);
      setImageIds(product?.imageIds);
      setInStock(product?.inStock);
      setBrand(product?.brand);
      setMaterial(product?.material);
      setWheelSize(product?.wheelSize);
      setColor(product?.color);
      setSize(product?.size);
      setGender(product?.gender);
    }
  }, [product]);

  const handleSave = () => {
    const editedProduct = {
      ...product,
      name,
      description,
      category,
      subcategory,
      price,
      imageIds,
      inStock,
      brand,
      material,
      wheelSize,
      color,
      size,
      gender,
    };
    onSave(editedProduct);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={Styles.modalContainer}>
        <Text style={Layout.subtitle}>Edit {name}</Text>
        <Text>Name</Text>
        <TextInput
          style={Layout.input}
          value={name}
          onChangeText={(value) => setName(value)}
        ></TextInput>

        <Text>Description</Text>
        <TextInput
          style={Layout.input}
          value={description}
          onChangeText={(value) => setDescription(value)}
        ></TextInput>

        <Text>Category</Text>
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

        <Text>Price</Text>
        <TextInput
          style={Layout.input}
          value={price.toString()}
          onChangeText={(value) => setPrice(Number(value))}
        ></TextInput>

        <Text>In Stock?</Text>
        <Picker
          style={Layout.input}
          selectedValue={inStock}
          onValueChange={(value) => setInStock(value)}
        >
          <Picker.Item label="true" value={true} />
          <Picker.Item label="false" value={false} />
        </Picker>

        {category === 'Bikes' && (
          <>
            <Text>Brand</Text>
            <TextInput
              style={Layout.input}
              value={brand}
              onChangeText={(value) => setBrand(value)}
            ></TextInput>

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
              <Picker.Item label="20in" value="20in"></Picker.Item>
              <Picker.Item label="24in" value="24in"></Picker.Item>
              <Picker.Item label="26in" value="26in"></Picker.Item>
              <Picker.Item label="27.5in" value="27.5in"></Picker.Item>
              <Picker.Item label="29in" value="29in"></Picker.Item>
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

            <Text>Gender</Text>
            <Picker
              style={Layout.input}
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
            >
              <Picker.Item label="Mens" value="Mens"></Picker.Item>
              <Picker.Item label="Womens" value="Womens"></Picker.Item>
              <Picker.Item label="Neutral" value="Neutral"></Picker.Item>
            </Picker>
          </>
        )}

        <Text>Image Upload: {'TODO'}</Text>

        <View style={Styles.buttonContainer}>
          <TouchableOpacity
            style={[Styles.button, Styles.saveBtn]}
            onPress={handleSave}
          >
            <Text style={Styles.buttonText}>
              Save <Icon name="save-outline"></Icon>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.button, Styles.deleteBtn]}
            onPress={onClose}
          >
            <Text style={Styles.buttonText}>
              Close <Icon name="close-outline"></Icon>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisibile, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState('');

  const tableHead = [
    '_id',
    'Name',
    'Description',
    'Category',
    'Subcategory',
    'Price',
    'ImageIDs',
    'In Stock',
    'Brand',
    'Material',
    'Wheel Size',
    'Color',
    'Size',
    'Gender',
  ];

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    ProductAPI.getAll().then((res) => setProducts(res.data));
    setMessage('Products retreived successfully');
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleSave = (editedProduct: Product) => {
    ProductAPI.update(editedProduct._id, editedProduct);
    const updatedProducts = products.map((product: Product) => {
      return product._id === editedProduct._id ? editedProduct : product;
    });
    setProducts(updatedProducts);
  };

  const handleDelete = (deletedProduct: Product) => {
    ProductAPI.delete(deletedProduct._id).then((res) =>
      setMessage(res.data.message)
    );
    const updatedProducts = products.filter((product: Product) => {
      return product._id !== deletedProduct._id;
    });
    setProducts(updatedProducts);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Products</Text>
      {message && (
        <>
          <Text>{message}</Text>
        </>
      )}

      {products &&
        products.map((product: Product) => (
          <View style={Layout.card} key={product?._id}>
            <Text>id: {product._id}</Text>
            <Text>name: {product?.name}</Text>
            <Text>description: {product?.description}</Text>
            <Text>category: {product?.category}</Text>
            <Text>subcategory: {product?.subcategory}</Text>
            <Text>price: {formatPrice(product?.price)}</Text>
            <Text>imageIds: {product?.imageIds}</Text>
            <Text>inStock: {product?.inStock?.toString()}</Text>
            <>
              {product?.category === 'Bikes' && (
                <>
                  <Text>brand: {product?.brand}</Text>
                  <Text>material: {product?.material}</Text>
                  <Text>wheelSize: {product?.wheelSize}</Text>
                  <Text>color: {product?.color}</Text>
                  <Text>size: {product?.size}</Text>
                  <Text>gender: {product?.gender}</Text>
                </>
              )}
            </>
            <View style={Styles.buttonContainer}>
              <TouchableOpacity
                style={[Styles.button, Styles.editBtn]}
                onPress={() => handleEdit(product)}
              >
                <Text style={Styles.buttonText}>
                  Edit <Icon name="create-outline"></Icon>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[Styles.button, Styles.deleteBtn]}
                onPress={() => handleDelete(product)}
              >
                <Text style={Styles.buttonText}>
                  Delete <Icon name="trash-outline"></Icon>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <EditProduct
        product={selectedProduct}
        visible={modalVisibile}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
};

const Products = () => {
  return (
    <ScrollView style={Layout.section}>
      <Text style={Layout.title}>Products</Text>
      <AddProduct />
      <ListProducts />
    </ScrollView>
  );
};

export default Products;
