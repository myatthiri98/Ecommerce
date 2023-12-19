

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSendResetLink = () => {
    // Validate the email format (you may use a library like 'validator')
    if (!email || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // TODO: Implement logic to send a password reset link or code to the user's email
    // For now, just show an alert as an example
    Alert.alert('Reset Link Sent', `A password reset link has been sent to ${email}`);
  };

  return (
    <View style={styles.container}>
    <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.sendLinkButton} onPress={handleSendResetLink}>
        <Text style={styles.sendLinkButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sendLinkButton: {
    backgroundColor: '#FF90BC',
    padding: 10,
    borderRadius: 5,
  },
  sendLinkButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    marginBottom: 20,
    marginTop: -200,
    width: 100,
    height: 100,
  },
});

export default ForgotPassword;
