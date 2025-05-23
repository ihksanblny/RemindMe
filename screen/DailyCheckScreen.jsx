import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For a nice check icon

// Theme Colors
const COLORS = {
  primary: '#10b981',
  primaryDark: '#065f46',
  text: '#1f2937',
  textSecondary: '#4b5563',
  background: '#ffffff', // Changed to white for a cleaner card/section look if needed, or keep #f0fdf4
  lightGreenBackground: '#f0fdf4',
  success: '#22c55e', // A brighter green for success
};

const DailyCheckScreen = () => {
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons name={checked ? "checkmark-circle" : "help-circle-outline"} size={60} color={checked ? COLORS.success : COLORS.primary} style={styles.icon} />
          <Text style={styles.title}>Cek Harian</Text>
          <Text style={styles.text}>Apakah kamu sudah olahraga hari ini?</Text>
          <Switch
            trackColor={{ false: '#d1d5db', true: COLORS.primaryLight }} // Lighter green for true track
            thumbColor={checked ? COLORS.primary : '#f4f3f4'}
            ios_backgroundColor="#d1d5db"
            onValueChange={setChecked}
            value={checked}
            style={styles.switch}
          />
          {checked && (
            <View style={styles.checkedContainer}>
              <Ionicons name="sparkles" size={24} color={COLORS.success} />
              <Text style={styles.checkedText}>Luar biasa! Sudah dicek.</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGreenBackground, // Main background for the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 17,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  switch: {
    transform: Platform.OS === 'ios' ? [{ scaleX: 1.2 }, { scaleY: 1.2 }] : [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Make switch slightly larger
    marginBottom: 20,
  },
  checkedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#e6fffa', // Very light green tint
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  checkedText: {
    fontSize: 16,
    color: COLORS.success, // Use theme success color
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DailyCheckScreen;