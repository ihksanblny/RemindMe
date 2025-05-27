// App.jsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import COLORS from './constant/colors';

import SplashScreen from './screen/SplashScreen';
import HomeScreen from './screen/HomeScreen';
import ReminderScreen from './screen/ReminderScreen';
import DailyCheckScreen from './screen/DailyCheckScreen';
import HealthTipsScreen from './screen/HealthTipsScreen';
import AddReminderScreen from './screen/AddReminderScreen';
import ReminderDetailScreen from './screen/ReminderDetailScreen';
import ProfileScreen from './screen/ProfileScreen';
import EditProfileScreen from './screen/EditProfileScreen';
import EditReminderScreen from './screen/EditReminderScreen';
import HabitListScreen from './screen/HabitListScreen';
import AddHabitScreen from './screen/AddHabitScreen';
import { ReminderProvider } from './context/ReminderContext';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ReminderStack = createStackNavigator();
const ProfileStack = createStackNavigator(); // Stack untuk Profil
const HabitStack = createStackNavigator(); // Stack untuk Habit

function ReminderFeatureNavigator() {
  return (
    <ReminderStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <ReminderStack.Screen
        name="ReminderList"
        component={ReminderScreen}
        options={({ navigation }) => ({
          title: 'Pengingat Saya',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddNewReminder')} style={{ marginRight: 15 }}>
              <Ionicons name="add-circle" size={32} color={COLORS.white} />
            </TouchableOpacity>
          ),
        })}
      />
      <ReminderStack.Screen name="AddNewReminder" component={AddReminderScreen} options={{ title: 'Tambah Pengingat' }} />
      <ReminderStack.Screen name="ReminderDetail" component={ReminderDetailScreen} options={{ title: 'Detail Pengingat' }} />
      <ReminderStack.Screen name="EditReminder" component={EditReminderScreen} options={{ title: 'Edit Pengingat' }} />
    </ReminderStack.Navigator>
  );
}

function HabitFeatureNavigator() {
  return (
    <HabitStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <HabitStack.Screen
        name="HabitList"
        component={HabitListScreen}
        options={({ navigation }) => ({
          title: 'Habit Tracker',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddHabit')} style={{ marginRight: 15 }}>
              <Ionicons name="add-circle" size={28} color={COLORS.white} />
            </TouchableOpacity>
          ),
        })}
      />
      <HabitStack.Screen name="AddHabit" component={AddHabitScreen} options={{ title: 'Tambah Kebiasaan' }} />
    </HabitStack.Navigator>
  );
}

function ProfileFeatureNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profil Saya' }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profil' }} />
    </ProfileStack.Navigator>
  );
}

function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { height: 65, paddingTop: 5, paddingBottom: 8, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Reminder') iconName = focused ? 'alarm' : 'alarm-outline';
          else if (route.name === 'DailyCheck') iconName = focused ? 'pulse' : 'pulse-outline';
          else if (route.name === 'Habit') iconName = focused ? 'checkmark-done' : 'checkmark-done-outline'; // Icon untuk Habit
          else if (route.name === 'HealthTips') iconName = focused ? 'leaf' : 'leaf-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person-circle' : 'person-circle-outline'; // Icon untuk Profil
          return <Ionicons name={iconName} size={size * 1.1} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reminder" component={ReminderFeatureNavigator} />
      <Tab.Screen name="DailyCheck" component={DailyCheckScreen} />
      <Tab.Screen name="Habit" component={HabitFeatureNavigator} />
      <Tab.Screen name="HealthTips" component={HealthTipsScreen} />
      <Tab.Screen name="Profile" component={ProfileFeatureNavigator} />
    </Tab.Navigator>
  );
}

// App.jsx
// ... kode lain ...

export default function App() {
  return (
    <ReminderProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="MainAppTabs" component={MainAppTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ReminderProvider>
  );
}