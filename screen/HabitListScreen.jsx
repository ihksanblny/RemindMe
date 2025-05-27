// HabitListScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView, // Untuk tampilan yang lebih baik di iOS dan beberapa Android
  ActivityIndicator, // Untuk indikator loading
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Untuk ikon
import COLORS from '../constant/colors'; // Sesuaikan path ke file colors.js Anda

const HabitListScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('habits')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const data = [];
          snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
          setHabits(data);
          if (loading) {
            setLoading(false);
          }
        },
        error => {
          console.error("Firestore snapshot error: ", error);
          Alert.alert('Error', 'Gagal mengambil data kebiasaan.');
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [loading]); // Tambahkan loading sebagai dependensi agar bisa diset false sekali

  const toggleStatus = async (id, currentStatus) => {
    try {
      await firestore().collection('habits').doc(id).update({ status: !currentStatus });
    } catch (error) {
      Alert.alert('Gagal', 'Tidak dapat memperbarui status.');
      console.error(error);
    }
  };

  const deleteHabitTracker = async (id) => {
    try {
      await firestore().collection('habits').doc(id).delete();
      Alert.alert('Sukses', 'Kebiasaan berhasil dihapus.');
    } catch (error) {
      Alert.alert('Gagal', 'Tidak dapat menghapus kebiasaan.');
      console.error(error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus kebiasaan ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => deleteHabitTracker(id) },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, item.status && styles.itemCompletedBackground]}>
      <TouchableOpacity style={styles.itemContent} onPress={() => toggleStatus(item.id, item.status)} activeOpacity={0.7}>
        <Ionicons
          name={item.status ? 'checkmark-circle' : 'ellipse-outline'}
          size={28}
          color={item.status ? COLORS.success : COLORS.primary}
          style={styles.statusIcon}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.habitName, item.status && styles.completedText]}>
            {item.name}
          </Text>
          <Text style={[styles.frequencyText, item.status && styles.completedText]}>
            Frekuensi: {item.frequency}
          </Text>
          {item.note ? <Text style={[styles.noteText, item.status && styles.completedText]}>{item.note}</Text> : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color={COLORS.error || '#ef4444'} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Memuat kebiasaan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Daftar Kebiasaan Saya</Text>
        </View>

        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            <View style={styles.emptyListComponent}>
              <Ionicons name="folder-open-outline" size={60} color={COLORS.textSecondary} />
              <Text style={styles.emptyListText}>Belum ada kebiasaan tercatat.</Text>
              <Text style={styles.emptyListSubText}>Mulai tambahkan kebiasaan baru!</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Menggunakan warna background dari RemindMe
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20, // Sesuaikan dengan kebutuhan
    marginBottom: 20,
  },
  title: {
    fontSize: 26, // Sesuaikan dengan SIZES.h2 jika menggunakan theme.js
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  addButton: {
    padding: 5,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: COLORS.surface, // Menggunakan warna surface
    borderRadius: 12, // Sesuaikan dengan SIZES.radius
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemCompletedBackground: {
    backgroundColor: '#e6fffa', // Warna mint sangat muda untuk item selesai
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  habitName: {
    fontSize: 18, // Sesuaikan dengan SIZES.h4
    fontWeight: '600',
    color: COLORS.text,
  },
  frequencyText: {
    fontSize: 14, // Sesuaikan dengan SIZES.body3
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  noteText: {
    fontSize: 14, // Sesuaikan dengan SIZES.body3
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary, // Warna teks lebih pudar saat selesai
  },
  deleteButton: {
    paddingLeft: 10, // Area sentuh untuk tombol hapus
  },
  emptyListComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18, // Sesuaikan dengan SIZES.h4
    color: COLORS.textSecondary,
    marginTop: 16,
    fontWeight: '600',
  },
  emptyListSubText: {
    fontSize: 14, // Sesuaikan dengan SIZES.body2
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});

export default HabitListScreen;