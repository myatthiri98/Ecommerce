import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import AppNavigator from './src/AppNavigator';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/redux/store';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  useEffect(() => {
    const exitApp = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit the app?',[
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', exitApp);

    return () => backHandler.remove();
  }, []);

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ReduxProvider>
  );
};

export default App;
