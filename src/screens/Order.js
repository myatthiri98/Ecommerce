import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  CheckBox,
} from 'react-native';
import Header from '../common/Header';
import { useState } from 'react';

const Orders = ({route, navigation}) => {
  const orderSummary = route.params?.orderSummary || {};
  console.log(orderSummary);



  // State variables for text input fields
  const [customerName, setCustomerName] = useState(orderSummary.customerName || '');
  const [address, setAddress] = useState(orderSummary.address || '');
  const [contact, setContact] = useState(orderSummary.contact || '');
  const [email, setEmail] = useState(orderSummary.email || '');
  const [phoneNumber, setPhoneNumber] = useState(orderSummary.phoneNumber || '');
  const [region, setRegion] = useState(orderSummary.region || '');



  return (
    <ScrollView style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Orders'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.sectionTitle}>Your Order List</Text>
      <View style={styles.orderSummary}>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Products:</Text>
          <Text style={styles.detailValue}>{orderSummary.products || 0}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text style={styles.detailValue}>{orderSummary.quantity || 0}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Sub-Total:</Text>
          <Text style={styles.detailValue}>
            ${orderSummary.subTotal ? orderSummary.subTotal.toFixed(2) : 0}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Discount:</Text>
          <Text style={styles.detailValue}>
            ${orderSummary.discount ? orderSummary.discount.toFixed(2) : 0}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Total:</Text>
          <Text style={styles.detailValue}>
            ${orderSummary.total ? orderSummary.total.toFixed(2) : 0}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Customer Information</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}>
          <Text style={styles.checkoutText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.customerInfo}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={customerName}
          onChangeText={(text) => setCustomerName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={contact}
          onChangeText={(text) => setContact(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Region"
          value={region}
          onChangeText={(text) => setRegion(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.checkout}
        onPress={() => {
          navigation.navigate('SignInScreen');
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
          Checkout
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 20,
  },
  detailLabel: {
    fontWeight: '600',
  },
  detailValue: {
    fontWeight: '400',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginRight: 10,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customerInfo: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: '#7D7D7DF2',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: '600',
  },
  infoValue: {
    fontWeight: '400',
    flexShrink: 1,
    textAlign: 'right',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#9A4986',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333', // Text color
  },  
  checkout: {
    width: '30%',
    height: 30,
    backgroundColor: '#FF0586',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10, 
    marginTop: 10,// Added margin at the bottom
  },
});
