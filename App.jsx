import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // tambahan
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen from './screen/SplashScreen'; // import splash screen
import HomeScreen from './screen/HomeScreen';
import ReminderScreen from './screen/ReminderScreen';
import DailyCheckScreen from './screen/DailyCheckScreen';
import HealthTipsScreen from './screen/HealthTipsScreen';
import { ReminderProvider } from './context/ReminderContext';

const Stack = createStackNavigator(); // stack navigator
const Tab = createBottomTabNavigator(); // tab navigator

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Reminder') iconName = focused ? 'alarm' : 'alarm-outline';
          else if (route.name === 'DailyCheck') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'HealthTips') iconName = focused ? 'leaf' : 'leaf-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingVertical: 8, height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reminder" component={ReminderScreen} />
      <Tab.Screen name="DailyCheck" component={DailyCheckScreen} />
      <Tab.Screen name="HealthTips" component={HealthTipsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ReminderProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* SplashScreen sebagai screen pertama */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          {/* Setelah splash selesai, ganti ke MainTabs */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReminderProvider>
  );
}
