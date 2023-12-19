// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Header from '../common/Header';
// import { useSelector } from 'react-redux';

// const CheckOut = ({ navigation }) => {
//   const cart = useSelector(state => state.cart);

//   if (!cart || !cart.data || cart.data.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: Cart is empty</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Header
//         leftIcon={require('../images/back.png')}
//         rightIcon={require('../images/cart.png')}
//         title={'Checkout'}
//         onClickLeftIcon={() => navigation.navigate('Cart')}
//         isCart={false}
//       />
//       {/* Display the order details */}
//       <View style={styles.checkoutContent}>
//         <Text style={styles.checkoutText}>Your Order List</Text>

//         {/* Iterate over the cart items and display details */}
//         {cart.data.map(item => (
//           <View key={item.id}>
//             <Text>{item.title}</Text>
//             <Text>Quantity: {item.qty}</Text>
//             <Text>Price: ${item.price.toFixed(2)}</Text>
//             {/* Add more details as needed */}
//           </View>
//         ))}

//         {/* Display total, sub-total, and discount */}
//         <Text>Total: ${cart.total.toFixed(2)}</Text>
//         <Text>Sub-Total: ${cart.subTotal.toFixed(2)}</Text>
//         <Text>Discount: ${cart.discount.toFixed(2)}</Text>
//         {/* Add more details as needed */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   checkoutContent: {
//     flex: 1,
//     alignItems: 'flex-start',
//     margin: 10,
//   },
//   checkoutText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default CheckOut;
