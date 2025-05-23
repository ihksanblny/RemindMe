// screen/ReminderDetailScreen.jsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ReminderContext } from '../context/ReminderContext';
import COLORS from '../constant/colors'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

// Komponen ini menerima 'route' untuk mendapatkan parameter navigasi
const ReminderDetailScreen = ({ route }) => {
  // 1. Ambil ID pengingat yang dikirim dari layar sebelumnya
  const { reminderId } = route.params;

  // 2. Ambil seluruh daftar pengingat dari context
  const { reminders } = useContext(ReminderContext);

  // 3. Cari pengingat yang cocok berdasarkan ID
  const reminder = reminders.find(r => r.id === reminderId);

  // 4. Jika karena suatu hal pengingat tidak ditemukan, tampilkan pesan
  if (!reminder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Pengingat tidak ditemukan.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 5. Format tanggal dan waktu agar mudah dibaca
  const reminderDate = new Date(reminder.date);
  const formattedDate = reminderDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = reminderDate.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name={reminder.icon || 'notifications'} size={40} color={COLORS.primary} />
          <Text style={styles.title}>{reminder.title}</Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.primaryDark} style={styles.icon} />
            <Text style={styles.detailText}>{formattedDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={24} color={COLORS.primaryDark} style={styles.icon} />
            <Text style={styles.detailText}>{formattedTime} WIB</Text>
          </View>
        </View>

        {reminder.notes ? (
          <View style={styles.notesCard}>
            <Text style={styles.notesTitle}>Catatan:</Text>
            <Text style={styles.notesText}>{reminder.notes}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGreenBackground,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginTop: 10,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  detailText: {
    fontSize: 17,
    color: COLORS.text,
  },
  notesCard: {
    backgroundColor: '#e6fffa', // Warna mint yang sangat terang
    borderRadius: 12,
    padding: 20,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ReminderDetailScreen;