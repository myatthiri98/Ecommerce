import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Header from '../common/Header';

const Orders = ({route, navigation}) => {
  const orderSummary = route.params?.orderSummary || {};
  console.log(orderSummary);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Orders'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Your Order List</Text>
      <View style={styles.orderSummary}>
        <Text style={styles.detailLabel}>
          Products: {orderSummary.products || 0}
        </Text>
        <Text style={styles.detailLabel}>
          Quantity: {orderSummary.quantity || 0}
        </Text>
        <Text style={styles.detailLabel}>
          Sub-Total: $
          {orderSummary.subTotal ? orderSummary.subTotal.toFixed(2) : 0}
        </Text>
        <Text style={styles.detailLabel}>
          Discount: $
          {orderSummary.discount ? orderSummary.discount.toFixed(2) : 0}
        </Text>
        <Text style={styles.detailLabel}>
          Total: ${orderSummary.total ? orderSummary.total.toFixed(2) : 0}
        </Text>
      </View>
      <Text style={styles.title}>Customer Information</Text>
      <Text style={styles.detailLabel}>
        Already have an account?
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}>
          <Text style={styles.checkoutText}>Sign In</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    left: 10,
    margin: 10,
  },
  orderSummary: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: '#7D7D7DF2',
  },
  detailLabel: {
    fontWeight: '600',
    marginBottom: 5,
    left: 10,
  },
  checkout: {
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  checkoutText: {
    color: '#fff',
    // textAlign: 'center',
    fontWeight: 'bold',
  },
});
