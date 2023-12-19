import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
  emptyCart,
  updateItemQuantity,
} from '../redux/slices/CartSlice';

const CheckoutLayout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const calculateTotals = () => {
    let total = 0;
    let subTotal = 0;
    let discount = 0;

    cart.data.forEach(item => {
      subTotal += item.qty * item.price;
      discount += (item.qty * item.price * item.discountPercentage) / 100;
    });

    total = subTotal - discount;

    return { total, subTotal, discount };
  };

  const { total, subTotal, discount } = calculateTotals();

  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        {/* Displaying cart details */}
        <Text style={styles.title}>Order Summary</Text>
        <View style={styles.cartDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Products:</Text>
            <Text style={styles.detailValue}>{cart.data.length}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity:</Text>
            <Text style={styles.detailValue}>{cart.data.reduce((acc, item) => acc + item.qty, 0)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sub-Total:</Text>
            <Text style={styles.detailValue}>{`$${subTotal.toFixed(2)}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Discount:</Text>
            <Text style={styles.detailValue}>{`$${discount.toFixed(2)}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total:</Text>
            <Text style={styles.detailValue}>{`$${total.toFixed(2)}`}</Text>
          </View>
        </View>
      </View>

      {/* Checkout button at the bottom-right */}
      <TouchableOpacity
        style={styles.checkout}
        onPress={() => {
          // Example of using cart actions
          dispatch(addItemToCart({ id: 1, /* other properties */ }));
          dispatch(reduceItemFromCart({ id: 1 }));
          dispatch(removeItemFromCart({ /* provide index or item details */ }));
          dispatch(emptyCart([]));
          dispatch(updateItemQuantity({ id: 1, qty: 5 }));

          // Navigate to the 'Order' screen
          navigation.navigate('Orders', {
            orderSummary: {
              products: cart.data.length,
              quantity: cart.data.reduce((acc, item) => acc + item.qty, 0),
              subTotal: subTotal,
              discount: discount,
              total: total,
            },
          });
          
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    height: 150,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderTopColor: '#ccc',
    justifyContent: 'flex-end', // Align to the bottom
    padding: 10,
  },
  tab: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartDetails: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: '600',
  },
  detailValue: {
    fontWeight: '400',
  },
  checkout: {
    width: '30%',
    height: 30,
    backgroundColor: '#FF8605',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10, 
    marginTop: 10,// Added margin at the bottom
  },
  total: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CheckoutLayout;


