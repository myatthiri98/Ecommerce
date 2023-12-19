import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const {signIn} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignIn = async () => {
    try {
      if (!username || !password) {
        if (!username) {
          setUsernameError(true);
        }

        if (!password) {
          setPasswordError(true);
        }
        return;
      }
      // Reset error styles
      setUsernameError(false);
      setPasswordError(false);

      await signIn(username, password);

      // Navigate to the main screen on successful sign-in
      navigation.navigate('Main');
    } catch (error) {
      console.error('Sign In Error:', error.message);
      alert('Invalid credentials');
    }
  };

  const handleForgotPassword = () => {
    // Navigate to ForgotPassword screen
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.scrollContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <TextInput
          style={[
            styles.input,
            styles.inputWithBorder,
            usernameError && styles.errorInput,
          ]}
          placeholder="Username"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setUsernameError(false); // Reset error style on user input
          }}
        />
        {usernameError && (
          <Text style={styles.errorMessage}>Username field is required</Text>
        )}
        <View
          style={[
            styles.input,
            styles.inputWithBorder,
            passwordError && styles.errorInput,
          ]}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError(false); // Reset error style on user input
            }}
            style={styles.passwordInput}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={
                passwordVisible
                  ? require('../images/eye-open.png')
                  : require('../images/eye-closed.png')
              }
              style={styles.eyeImage}
            />
          </TouchableOpacity>
        </View>
        {passwordError && (
          <Text style={styles.errorMessage}>Password field is required</Text>
        )}
        <TouchableOpacity onPress={handleSignIn} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleForgotPassword} // Call handleForgotPassword on press
          style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register / Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}
          style={styles.guestButton}>
          <Text style={styles.guestButtonText}>Guest User</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  inputWithBorder: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
    marginTop: -200,
    width: 100,
    height: 100,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    padding: 10,
  },
  eyeImage: {
    width: 20,
    height: 20,
  },
  loginButton: {
    backgroundColor: '#FF3FA4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#31139F',
    marginTop: 10,
  },
  separator: {
    height: 20,
  },
  registerButton: {
    backgroundColor: '#FF90BC',
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  guestButton: {
    backgroundColor: '#986FB6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  guestButtonText: {
    color: '#000',
    textAlign: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginLeft: 10,
  },
  forgotPassword: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#31139F',
  },
  logo: {
    marginBottom: 20,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default SignInScreen;
