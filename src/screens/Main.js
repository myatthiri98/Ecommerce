import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View, Text } from 'react-native';

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        drawerStyle: { width: '70%' },
        drawerActiveTintColor: '#FF3FA4',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Sign In',
        }}
      />
      <Drawer.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Sign Up',
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        
        <Text style={styles.title}>Ecommerce</Text>
       
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Main;
