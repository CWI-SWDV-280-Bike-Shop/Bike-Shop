import React, { useEffect, useState } from 'react';
import {View, Text, Button, TextInput, ScrollView, Modal, TouchableOpacity,} from 'react-native';
import Layout from '@styles/layout/Layout';
import { Product } from '@/types/data.types';
import ProductAPI from '@api/product.api';
import { formatPrice } from '@/utilities/formatter';
import { ItemCard } from '../Cards/ItemCards';

// const Listproducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     ProductAPI.getAll().then((res) => setProducts(res.data));
//   }, []);

//   return (
//     <View style={Layout.subsection}>
//       {products &&
//         products.map((product) => (
//           <View style={styles.product} key={product._id}>
//             {/* <Text>ID: {product._id}</Text>
//             <Text>Description: {product.description.toString()}</Text>
//             <Text>Category: {product.category.toString()}</Text>
//             <Text>Gender: {product.gender.toString()}</Text> */}

//             <ItemCard
//               name={product.name.toString()}
//               price={product.price.toString()}
//               imgSrc={require('../../../assets/Images/cityproductstockimg.png')}
//               btnName={'Add to Cart'}
//               stockStatus={product.inStock.toString()}
//               color={product.color.toString()}
//               size={product.size.toString()}
//             />
//           </View>
//         ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   product: {
//     margin: 10,
//   },
// });

// export default Listproducts;


const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editModalVisibile, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ProductAPI.getAll().then((res) => {
      setProducts(res.data);
      // setMessage(res.data?.message); // return `message` on the backend??
    });
  }, []);

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Products</Text>
      {/* {message && <Text>{message}</Text>} */}

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
          </View>
        ))}
    </View>
  );
};