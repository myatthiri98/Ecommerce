import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CheckoutLayout from '../common/CheckoutLayout';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Fetch cart items from Redux store using useSelector
  const cartItemsFromStore = useSelector((state) => state.cart.data);

  useEffect(() => {
    // Remove the following line since you've commented out local state
    // setCartItems(cartItemsFromStore);
  }, [cartItemsFromStore]); // Update the effect dependency

  const getTotal = () => {
    let total = 0;
    if (cartItemsFromStore) {
      cartItemsFromStore.forEach((item) => {
        total += item.qty * item.price;
      });
    }
    return total.toFixed(0);
  };

  const renderItem = ({ index }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.productItem}
      onPress={() => {
        navigation.navigate('ProductDetail', { data: cartItemsFromStore[index] });
      }}>
      <Image source={{ uri: cartItemsFromStore[index].thumbnail }} style={styles.itemImage} />
      <View>
        <Text style={styles.name}>
          {cartItemsFromStore[index].title && cartItemsFromStore[index].title.length > 25
            ? cartItemsFromStore[index].title.substring(0, 25) + '...'
            : cartItemsFromStore[index].title}
        </Text>
        <Text style={styles.desc}>
          {cartItemsFromStore[index].description && cartItemsFromStore[index].description.length > 30
            ? cartItemsFromStore[index].description.substring(0, 30) + '...'
            : cartItemsFromStore[index].description}
        </Text>
        <View style={styles.qtyview}>
          <Text style={styles.price}>{'$' + cartItemsFromStore[index].price}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (cartItemsFromStore[index].qty > 1) {
                dispatch(reduceItemFromCart(cartItemsFromStore[index]));
              } else {
                dispatch(removeItemFromCart(index));
              }
            }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{cartItemsFromStore[index].qty}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              dispatch(addItemToCart(cartItemsFromStore[index]));
            }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title={'Cart Items'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={cartItemsFromStore}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + index}
      />
      {cartItemsFromStore && cartItemsFromStore.length < 1 && (
        <View style={styles.noItems}>
          <Image source={require('../images/empty_cart.png')} style={styles.itemImage} />
          <Text style={styles.text}>No Items in Cart</Text>
        </View>
      )}
      {cartItemsFromStore && cartItemsFromStore.length > 0 && (
        <CheckoutLayout items={cartItemsFromStore.length} total={getTotal()} />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  qtyview: {
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
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  }
});
