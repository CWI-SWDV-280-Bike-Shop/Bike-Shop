import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Layout from '@styles/layout/Layout';
import { Product } from '@/types/data.types';
import ProductAPI from '@api/product.api';
import { formatPrice } from '@/utilities/formatter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ShopContext } from '@/context/shop.context';

export const ListProducts = () => {
  const { addToCart } = useContext(ShopContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ProductAPI.getAll().then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <View style={Layout.subsection}>
      {products &&
        products.map((product: Product, index: number) => (
          <View style={styles.product} key={index}>
            <View style={[styles.card]}>
              <View style={[styles.leftSide]}>
                {/* <Image source={imgSrc} style={[styles.bikeImage]}/> */}
                <Text style={[styles.heading]}>{product?.name}</Text>
                <Text style={[styles.bodyText]}>{product?.description}</Text>
              </View>
              <View style={[styles.rightSide]}>
                <>
                  {' '}
                  {/* Stock Condition */}
                  {product?.inStock?.toString() === 'true' && (
                    <>
                      <Text style={[styles.stockText]}>In Stock</Text>
                    </>
                  )}
                  {product?.inStock?.toString() === 'false' && (
                    <>
                      <Text style={[styles.stockText]}>Out of Stock</Text>
                    </>
                  )}
                </>
                {/* <Image source={imgSrc} style={[styles.stars]}/> */}
                <View style={[styles.descTextContainer]}>
                  <Text style={[styles.descText]}>
                    {formatPrice(product?.price)}
                  </Text>
                  <Text style={[styles.descText]}>{product?.subcategory}</Text>
                </View>
                <>
                  {' '}
                  {/* Add to Cart Condition */}
                  {product?.inStock?.toString() === 'true' && (
                    <>
                      <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => addToCart(product)}
                      >
                        <Text style={[styles.buttonText]}>Add to Cart</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {product?.inStock?.toString() === 'false' && (
                    <>
                      <TouchableOpacity style={[styles.button]}>
                        <Text style={[styles.buttonText]}>Notify Me</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 10,
  },
  bikeImage: {
    width: 225,
    height: 150,
  },
  card: {
    backgroundColor: '#FFFFFF85',
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5,
  },
  leftSide: {
    alignItems: 'center',
  },
  rightSide: {
    flex: 1,
    marginRight: 0,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
  },
  bodyText: {
    fontSize: 20,
  },
  stars: {
    flex: 1,
  },
  descTextContainer: {
    flex: 2,
    fontSize: 15,
  },
  descText: {
    paddingVertical: 4,
  },
  stockText: {
    flex: 1,
    fontSize: 15,
    color: 'gray',
  },
  button: {
    backgroundColor: '#62929E',
    padding: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ListProducts;

// const ListProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editModalVisibile, setEditModalVisible] = useState(false);
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     ProductAPI.getAll().then((res) => {
//       setProducts(res.data);
//       // setMessage(res.data?.message); // return `message` on the backend??
//     });
//   }, []);

//   return (
//     <View style={Layout.subsection}>
//       <Text style={Layout.subtitle}>List Products</Text>
//       {/* {message && <Text>{message}</Text>} */}

//       {products &&
//         products.map((product: Product) => (
//           <View style={Layout.card} key={product?._id}>
//             <Text>id: {product._id}</Text>
//             <Text>name: {product?.name}</Text>
//             <Text>description: {product?.description}</Text>
//             <Text>category: {product?.category}</Text>
//             <Text>subcategory: {product?.subcategory}</Text>
//             <Text>price: {formatPrice(product?.price)}</Text>
//             <Text>image: {product?.image}</Text>
//             <Text>inStock: {product?.inStock?.toString()}</Text>
//             <>
//               {product?.category === 'Bikes' && (
//                 <>
//                   <Text>brand: {product?.brand}</Text>
//                   <Text>material: {product?.material}</Text>
//                   <Text>wheelSize: {product?.wheelSize}</Text>
//                   <Text>color: {product?.color}</Text>
//                   <Text>size: {product?.size}</Text>
//                   <Text>gender: {product?.gender}</Text>
//                 </>
//               )}
//             </>
//           </View>
//         ))}
//     </View>
//   );
// };
