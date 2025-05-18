import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const tips = [
  {
    id: '1',
    title: 'Minum air putih minimal 8 gelas sehari',
    image: require('../assets/gambar/minum.jpg'),
  },
  {
    id: '2',
    title: 'Tidur cukup minimal 7 jam setiap malam',
    image: require('../assets/gambar/tidur.jpg'),
  },
  {
    id: '3',
    title: 'Kurangi makanan berlemak dan perbanyak serat',
    image: require('../assets/gambar/makanan.jpg'),
  },
  {
    id: '4',
    title: 'Lakukan peregangan setiap 1 jam saat duduk',
    image: require('../assets/gambar/olahraga.jpg'),
  },
];

const HealthTipsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tips Kesehatan</Text>
      {tips.map((tip) => (
  <View key={tip.id} style={styles.card}>
    <Image source={tip.image} style={styles.image} resizeMode="cover" />
    <Text style={styles.tipText}>{tip.title}</Text>
  </View>
))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0fdf4' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#047857',
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  tipText: {
    padding: 12,
    fontSize: 16,
    color: '#065f46',
  },
});

export default HealthTipsScreen;
