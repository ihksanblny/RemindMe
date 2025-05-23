import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView, Platform } from 'react-native';

// Theme Colors
const COLORS = {
  primary: '#10b981',
  primaryDark: '#065f46',
  text: '#1f2937',
  textSecondary: '#4b5563',
  background: '#f0fdf4',
  surface: '#ffffff', // Card background
};

const tips = [
  {
    id: '1',
    title: 'Minum air putih minimal 8 gelas sehari',
    image: require('../assets/gambar/minum.jpg'), // Pastikan path ini benar
  },
  {
    id: '2',
    title: 'Tidur cukup minimal 7 jam setiap malam',
    image: require('../assets/gambar/tidur.jpg'), // Pastikan path ini benar
  },
  {
    id: '3',
    title: 'Kurangi makanan berlemak dan perbanyak serat',
    image: require('../assets/gambar/makanan.jpg'), // Pastikan path ini benar
  },
  {
    id: '4',
    title: 'Lakukan peregangan setiap 1 jam saat duduk',
    image: require('../assets/gambar/olahraga.jpg'), // Pastikan path ini benar
  },
];

// Extracted TipCard component for better structure and reusability
const TipCard = ({ tip }) => (
  <View style={styles.card}>
    <Image source={tip.image} style={styles.image} resizeMode="cover" />
    <View style={styles.textContainer}>
      <Text style={styles.tipText}>{tip.title}</Text>
    </View>
  </View>
);

const HealthTipsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tips Kesehatan Harian</Text>
        {tips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16, // Horizontal padding for content
    paddingTop: Platform.OS === 'android' ? 20 : 0, // Padding for Android status bar
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 24, // Increased margin
    marginTop: 16,
    textAlign: 'left', // Align title to the left for a more standard look
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16, // Slightly larger radius
    marginBottom: 20,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // 'visible' for iOS shadow to work well
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 }, // More pronounced shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6, // Android shadow
  },
  image: {
    width: '100%',
    height: 200, // Slightly increased height
    borderTopLeftRadius: 16, // Match card radius
    borderTopRightRadius: 16, // Match card radius
  },
  textContainer: {
    padding: 16, // Increased padding
  },
  tipText: {
    fontSize: 17, // Slightly larger font
    color: COLORS.text,
    lineHeight: 24, // Improved readability
    fontWeight: '500',
  },
});

export default HealthTipsScreen;