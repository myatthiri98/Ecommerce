import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Hypothetical authentication context and functions
import { useAuth } from '../context/AuthContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  // Simulating a delay for the splash screen, you can replace it with your logic
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      // Don't automatically navigate, let the user decide
    }, 2000); // 2000 milliseconds (2 seconds)

    return () => clearTimeout(splashTimeout);
  }, []);

  // Function to handle navigation to the shop
  const goToShop = () => {
    // You can add additional logic or navigate directly
    navigation.navigate('Main');
  };

  // Function to handle sign in
  const handleSignIn = () => {
    // Navigate to SignIn screen
    navigation.navigate('SignIn');
  };

  // Function to handle sign up
  const handleSignUp = () => {
    // Navigate to SignUp screen
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.shopName}>Shopify Haven</Text>
      <Text style={styles.title}>Welcome to Ecommerce Shopping</Text>
      <Text style={styles.subtitle}>Explore & Shop</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToShop}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  shopName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF69B4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    marginTop: 20,
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
