import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {addItemToWishList} from '../redux/slices/WishlistSlice';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import {ImageSlider} from 'react-native-image-slider-banner';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const productData = route.params.data;
  const dispatch = useDispatch();


  const IMAGES = productData.images.map((image, index) => ({
    img: image,
    id: index.toString(),
  }));

  // Use state to manage the quantity
  const [quantity, setQuantity] = useState(productData.qty || 1);

  
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/cart.png')}
        title={'Product Detail'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <View style={styles.imageContainer}>
        {/* ImageSlider */}
        <ImageSlider
          data={IMAGES}
          autoPlay={true}
          // onItemChanged={item => console.log('item', item)}
          closeIconColor="#000"
          style={styles.image}
          indicatorContainerStyle={{ bottom: 380 }}
        />

        {/* Details Container */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{productData.title}</Text>
          <Text style={styles.description}>{productData.description}</Text>
          <Text style={styles.price}>Price: ${productData.price}</Text>
          <Text style={styles.stock}>Stock: {productData.stock}</Text>
          <View style={styles.qtyView}>
            <Text style={styles.price}>${productData.price}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (quantity > 1) {
                  // Reduce the quantity in local state
                  setQuantity(quantity - 1);
                  dispatch(reduceItemFromCart(productData));
                } else {
                  // If quantity is 1, remove the item from cart
                  dispatch(removeItemFromCart(productData.id));
                }
              }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                // Increase the quantity in local state
                setQuantity(quantity + 1);
                dispatch(addItemToCart(productData));
              }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>+</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
      
        bg={'#F11A7B'}
        title={'Add To Cart'}
        color={'#fff'}
        onClick={() => {
          dispatch(
            addItemToCart({
              ...route.params.data,
              qty: quantity,
            }),
          );
        }}
      />
        </View>
      </View>

      <TouchableOpacity
        style={styles.wishlistBtn}
        onPress={() => {
          dispatch(addItemToWishList(route.params.data));
        }}>
        <Image source={require('../images/heart.png')} style={styles.icon} />
      </TouchableOpacity>

      
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 50,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    elevation: 1,
  },
  title: {
    fontSize: 26,
    color: '#000',
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF', // Blue color for emphasis
    marginTop: 10,
  },
  discount: {
    fontSize: 16,
    color: '#FF4500', // Orange-Red color for emphasis
    marginTop: 5,
  },
  stock: {
    fontSize: 16,
    color: '#28a745', // Green color for emphasis
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    color: '#FF8400', // Gold color for emphasis
    marginTop: 5,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom position as needed
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    backgroundColor: 'white', // Add a background color to make it distinct
  },
  wishlistBtn: {
    position: 'absolute',
    right: 20,
    top: 80,
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: '#FF3FA4',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
  },
});
