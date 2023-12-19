import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addProducts} from '../../redux/slices/ProductsSlice';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    console.log('Fetching products...');

    axios
      .get('https://dummyjson.com/products')
      .then(response => {
        console.log('Products fetched successfully:', response.data);
        setProducts(response.data);
       const modData= response.data.products.map(item => ({
          ...item,
          qty:1
        }));
        dispatch(addProducts(modData));
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleAddToCart = item => {
    // Implement your addToCart logic here
    console.log('Adding to cart:', item.title);
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../images/menu.png')}
        rightIcon={require('../../images/cart.png')}
        title={'Products'}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        isCart={true}
      />
      <FlatList
        style={styles.flatListContainer}
        data={products.products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View style={styles.productItem}>
            <Image
              source={{uri: item.thumbnail}}
              style={styles.itemImage}
              resizeMode="cover" // Ensure the image covers the entire space
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>Price: ${item.price}</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.addToCartButton}
                onPress={() => {
                  navigation.navigate('ProductDetail', {data: item});
                }}>
                <Text style={styles.buttonText}>View Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
  },
  productItem: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  itemImage: {
    width: 180,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 10,
  },
  productDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: '#FF3FA4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
    width: 120,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
