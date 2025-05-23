// App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import COLORS from './constant/colors'; // ⬅️ Pastikan path ini benar!

import SplashScreen from './screen/SplashScreen';
import HomeScreen from './screen/HomeScreen';
import ReminderScreen from './screen/ReminderScreen';
import DailyCheckScreen from './screen/DailyCheckScreen';
import HealthTipsScreen from './screen/HealthTipsScreen';
import AddReminderScreen from './screen/AddReminderScreen';
import ReminderDetailScreen from './screen/ReminderDetailScreen';
import { ReminderProvider } from './context/ReminderContext';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ReminderStack = createStackNavigator();

// 🧠 Stack khusus fitur Reminder (list + add)
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
        // 👇 PERUBAHAN UTAMA ADA DI SINI
        options={({ navigation }) => ({
          title: 'Pengingat Saya',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewReminder')}
              style={{ marginRight: 15 }} // Memberi jarak dari tepi kanan
            >
              <Ionicons name="add-circle" size={32} color={COLORS.white} />
            </TouchableOpacity>
          ),
        })}
      />
      <ReminderStack.Screen
        name="AddNewReminder"
        component={AddReminderScreen}
        options={{ title: 'Tambah Pengingat' }}
      />
      <ReminderStack.Screen
        name="ReminderDetail"
        component={ReminderDetailScreen}
        options={{ title: 'Detail Pengingat' }}
      />
    </ReminderStack.Navigator>
  );
}

// 🔽 Bottom Tab utama aplikasi
function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Reminder') {
            iconName = focused ? 'alarm' : 'alarm-outline';
          } else if (route.name === 'DailyCheck') {
            iconName = focused ? 'pulse' : 'pulse-outline';
          } else if (route.name === 'HealthTips') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reminder" component={ReminderFeatureNavigator} />
      <Tab.Screen name="DailyCheck" component={DailyCheckScreen} options={{ title: 'Cek Harian' }} />
      <Tab.Screen name="HealthTips" component={HealthTipsScreen} options={{ title: 'Tips Sehat' }} />
    </Tab.Navigator>
  );
}

// 🔁 Entry point utama aplikasi
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
