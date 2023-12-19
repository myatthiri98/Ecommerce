import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import Header from '../common/Header'; // Make sure to import the Header component
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const handleSignUp = () => {
    // Validate the input fields
    if (!name || !email || !email.includes('@') || !password || password !== confirmPassword || !phoneNumber || !state || !city || !address) {
      Alert.alert('Invalid Input', 'Please enter valid information in all fields');
      return;
    }

    // TODO: Implement logic to create a new user account
    // For now, just show an alert as an example
    Alert.alert('Sign Up Success', `Account created for ${name}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Fixed Header */}
        <View style={styles.headerContainer}>
          <Header
            title="Sign Up"
            leftIcon={require('../images/back.png')}
            onClickLeftIcon={() => navigation.goBack()}
          />
        </View>
        {/* End Fixed Header */}
        <View style={styles.contentContainer}>
          <Image source={require('../images/logo.png')} style={styles.logo} />
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={(text) => setState(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    height: 80, // Set a fixed height for the header
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 3,  // Add this line to create a bottom line
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    paddingLeft: 25,
  },
  signUpButton: {
    backgroundColor: '#FF3FA4',
    padding: 10,
    borderRadius: 5,
    width: '70%',
    alignSelf: 'center', // Use alignSelf to center the button
    marginTop: 20, // Adjust marginTop as needed
  },
  signUpButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
});

export default SignUpScreen;
