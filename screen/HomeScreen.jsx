import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const reminders = [
    { id: '1', title: 'Minum Air Pagi' },
    { id: '2', title: 'Stretching 5 Menit' },
    { id: '3', title: 'Cek Detak Jantung' },
  ];

  const imageUrls = [
    'https://images.unsplash.com/photo-1587502536263-9298f1a8b9ef?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=60',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Selamat Datang di RemindMe</Text>
      <Text style={styles.subtitle}>Aplikasi Cek Kesehatan Harian Anda</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {imageUrls.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.scrollImage} />
        ))}
      </ScrollView>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Masukkan Nama Anda:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {name !== '' && (
          <Text style={styles.greeting}>Halo, {name}! Yuk mulai cek kesehatanmu hari ini.</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.cardButton, { backgroundColor: '#10b981' }]}
          onPress={() => navigation.navigate('Reminder', { reminders })}
        >
          <Text style={styles.buttonText}>Lihat Reminder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cardButton, { backgroundColor: '#06b6d4' }]}
          onPress={() => navigation.navigate('DailyCheck')}
        >
          <Text style={styles.buttonText}>Cek Harian</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cardButton, { backgroundColor: '#6366f1' }]}
          onPress={() => navigation.navigate('HealthTips')}
        >
          <Text style={styles.buttonText}>Tips Kesehatan</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Jadwal Kesehatan Hari Ini</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>• {item.title}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', padding: 16 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#065f46',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#047857',
    textAlign: 'center',
    marginBottom: 12,
  },
  imageScroll: {
    marginBottom: 16,
  },
  scrollImage: {
    width: 180,
    height: 120,
    borderRadius: 12,
    marginRight: 10,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#065f46',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  greeting: {
    marginTop: 8,
    color: '#065f46',
    fontSize: 14,
  },
  buttonContainer: {
    marginBottom: 24,
    gap: 12,
  },
  cardButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  listItem: {
    padding: 12,
    backgroundColor: '#d1fae5',
    borderRadius: 10,
    marginBottom: 6,
  },
  listText: {
    fontSize: 16,
    color: '#065f46',
  },
});

export default HomeScreen;
