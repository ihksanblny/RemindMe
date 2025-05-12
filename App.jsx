import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';

const App = () => {
  // State untuk menyimpan nama pengguna
  const [name, setName] = useState('');
  // State untuk kontrol tampilan modal
  const [modalVisible, setModalVisible] = useState(false);

  // Data pengingat kesehatan harian
  const reminders = [
    { id: '1', title: 'Minum Air Pagi' },
    { id: '2', title: 'Stretching 5 Menit' },
    { id: '3', title: 'Cek Detak Jantung' },
  ];

  // Daftar URL gambar yang relevan dengan gaya hidup sehat
  const imageUrls = [
    'https://images.unsplash.com/photo-1587502536263-9298f1a8b9ef?auto=format&fit=crop&w=800&q=60', // Detak Jantung
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=60', // Jogging
    'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=60', // Yoga
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60', // Air Minum
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=60', // Healthy Food
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header aplikasi */}
      <View style={styles.header}>
        <Text style={styles.title}>RemindMe!</Text>
        <Text style={styles.subText}>Aplikasi Cek Kesehatan Harian</Text>
      </View>

      {/* Gambar-gambar motivasi hidup sehat */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.scrollImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Input nama pengguna */}
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

      {/* Tombol untuk melihat reminder */}
      <View style={styles.buttonSection}>
        <Button title="Lihat Reminder" color="#10b981" onPress={() => setModalVisible(true)} />
      </View>

      {/* Daftar kegiatan hari ini */}
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

      {/* Modal reminder */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reminder Hari Ini</Text>
            {reminders.map((item) => (
              <Text key={item.id}>• {item.title}</Text>
            ))}
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Style komponen-komponen aplikasi
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', padding: 16 },
  header: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#047857' },
  subText: { fontSize: 14, color: '#065f46' },

  imageScroll: { marginVertical: 10 },
  scrollImage: {
    width: 180,
    height: 120,
    marginRight: 10,
    borderRadius: 12,
  },

  inputSection: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5, color: '#065f46' },
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

  buttonSection: { marginBottom: 20 },
  subTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  listItem: {
    padding: 12,
    backgroundColor: '#d1fae5',
    marginVertical: 5,
    borderRadius: 10,
  },
  listText: {
    fontSize: 16,
    color: '#065f46',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    margin: 30,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#047857',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default App;
