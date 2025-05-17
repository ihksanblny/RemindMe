import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const tips = [
  {
    title: 'Perbanyak Minum Air Putih',
    description: 'Minum minimal 8 gelas air setiap hari membantu menjaga fungsi tubuh dan mencegah dehidrasi.',
    image: 'https://images.unsplash.com/photo-1587502536263-9298f1a8b9ef?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Tidur yang Cukup',
    description: 'Tidur selama 7–8 jam setiap malam penting untuk menjaga kesehatan mental dan fisik.',
    image: 'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Kurangi Makanan Berlemak',
    description: 'Mengurangi makanan tinggi lemak jenuh dapat menurunkan risiko penyakit jantung.',
    image: 'https://images.unsplash.com/photo-1571091718767-18b1e1b13f79?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Peregangan Saat Duduk Lama',
    description: 'Lakukan stretching ringan setiap jam untuk menjaga peredaran darah dan mengurangi ketegangan otot.',
    image: 'https://images.unsplash.com/photo-1584466977773-4b59ef7ec2e5?auto=format&fit=crop&w=800&q=60',
  },
];

const HealthTipsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=60',
        }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <Text style={styles.title}>Tips Kesehatan Harian</Text>

      {tips.map((tip, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: tip.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{tip.title}</Text>
            <Text style={styles.cardDesc}>{tip.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4' },
  headerImage: { width: '100%', height: 180 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: '#047857',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 160 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#065f46' },
  cardDesc: { fontSize: 14, color: '#374151', marginTop: 4 },
});

export default HealthTipsScreen;
