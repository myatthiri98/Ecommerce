// In your AuthContext.js

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signIn = async (username, password) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Assuming the API returns a token upon successful login
        const { token } = data;
  
        // Set the current user based on the token (this may vary based on your actual API response)
        setCurrentUser({ username: data.username, token });
      } else {
        console.error('Sign In Error:', data.message || 'Unknown error');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign In Error:', error.message);
      throw new Error('Invalid credentials');
    }
  };
  
  const signUp = async (username, password) => {
    // Simulating signup by creating a new user locally
    const newUser = { username, password };

    // Assuming the API returns a token upon successful sign-up
    const token = 'mockedToken';

    // Set the current user based on the token (this may vary based on your actual API response)
    setCurrentUser({ username, token });

    // Return the created user (you might want to handle this differently based on your needs)
    return newUser;
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
