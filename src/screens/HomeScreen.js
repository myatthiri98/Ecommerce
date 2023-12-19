import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Wishlist from './tabs/Wishlist';
import Notification from './tabs/Notification';
import User from './tabs/User';
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const route = useRoute(); // Use the useRoute hook to get the route object

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../images/home_fill.png')
                  : require('../images/home.png')
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../images/search.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../images/heart_fill.png')
                  : require('../images/heart.png')
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../images/noti_fill.png')
                  : require('../images/noti.png')
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../images/user_fill.png')
                  : require('../images/user.png')
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
