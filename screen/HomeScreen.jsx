// screen/HomeScreen.jsx
import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ReminderContext } from '../context/ReminderContext'; // 1. Impor Context
import COLORS from '../constant/colors'; // Pastikan path ini benar

// Komponen Kartu untuk Dashboard
const SummaryCard = ({ icon, title, value, color, onPress }) => (
  <TouchableOpacity style={[styles.summaryCard, { backgroundColor: color }]} onPress={onPress} activeOpacity={0.8}>
    <Ionicons name={icon} size={32} color={COLORS.white} />
    <Text style={styles.summaryCardTitle}>{title}</Text>
    <Text style={styles.summaryCardValue}>{value}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('Pengguna'); // Nama default
  const { reminders } = useContext(ReminderContext); // 2. Ambil data dinamis dari context

  // 3. Logika untuk memfilter dan mengurutkan pengingat yang akan datang
  const upcomingReminders = useMemo(() => {
    const now = new Date();
    return reminders
      .filter(r => new Date(r.date) > now) // Ambil pengingat di masa depan
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Urutkan dari yang terdekat
      .slice(0, 3); // Ambil 3 teratas
  }, [reminders]);

  const imageUrls = [
    'https://images.unsplash.com/photo-1587502536263-9298f1a8b9ef?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=60',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Bagian Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Selamat Datang,</Text>
          <Text style={styles.subtitle}>{name}!</Text>
        </View>

        {/* Scroll Gambar Horizontal */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollContainer}>
          {imageUrls.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.scrollImage} />
          ))}
        </ScrollView>
        
        {/* 4. Tampilan Dashboard Baru */}
        <View style={styles.dashboardContainer}>
          <SummaryCard
            icon="alarm-outline"
            title="Total Pengingat"
            value={reminders.length}
            color={COLORS.primary}
            onPress={() => navigation.navigate('Reminder')}
          />
          <SummaryCard
            icon="leaf-outline"
            title="Tips Sehat"
            value="Lihat"
            color={COLORS.accentIndigo}
            onPress={() => navigation.navigate('HealthTips')}
          />
          <SummaryCard
            icon="pulse-outline"
            title="Cek Harian"
            value="Mulai"
            color={COLORS.accentCyan}
            onPress={() => navigation.navigate('DailyCheck')}
          />
        </View>

        {/* 5. Daftar Dinamis Pengingat Mendatang */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segera Dilakukan</Text>
          {upcomingReminders.length > 0 ? (
            <FlatList
              data={upcomingReminders}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const itemDate = new Date(item.date);
                const formattedTime = itemDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                return (
                  <TouchableOpacity 
                    style={styles.listItem}
                    onPress={() => navigation.navigate('Reminder', { screen: 'ReminderDetail', params: { reminderId: item.id } })}
                  >
                    <Ionicons name={item.icon} size={24} color={COLORS.primaryDark} style={styles.listItemIcon} />
                    <View style={styles.listItemTextContainer}>
                        <Text style={styles.listText}>{item.title}</Text>
                        <Text style={styles.listSubText}>Hari ini, pukul {formattedTime}</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={22} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                )
              }}
            />
          ) : (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>Tidak ada pengingat yang akan datang.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  subtitle: {
    fontSize: 22,
    color: COLORS.textSecondary,
    marginTop: -5,
  },
  imageScrollContainer: {
    paddingLeft: 20,
    marginTop: 10,
  },
  scrollImage: {
    width: 250,
    height: 140,
    borderRadius: 16,
    marginRight: 16,
  },
  dashboardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  summaryCardTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  summaryCardValue: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  listItemIcon: {
    marginRight: 16,
  },
  listItemTextContainer: {
    flex: 1,
  },
  listText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  listSubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  emptyListContainer: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
  }
});

export default HomeScreen;