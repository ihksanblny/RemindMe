// screen/ReminderScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import * as ReminderService from '../services/ReminderServices';
import COLORS from '../constant/colors';

const ReminderScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadReminders = async () => {
    try {
      const data = await ReminderService.getReminders();
      setReminders(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
      Alert.alert('Error', 'Tidak dapat mengambil pengingat.');
    }
};

  const deleteReminder = async (id) => {
  try {
    await ReminderService.deleteReminder(id);
    Alert.alert('Sukses', 'Pengingat berhasil dihapus.');
    await loadReminders(); // <--- PENTING: Refresh ulang dari server
  } catch (error) {
    console.error('Gagal menghapus:', error);
    Alert.alert('Error', 'Tidak dapat menghapus pengingat.');
  }
};

  useFocusEffect(
    useCallback(() => {
      loadReminders();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadReminders();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const itemDate = new Date(item.date);
    const formattedDate = itemDate.toLocaleDateString('id-ID');
    const formattedTime = itemDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress={() =>
          Alert.alert(
            'Hapus Pengingat',
            'Yakin ingin menghapus?',
            [
              { text: 'Batal', style: 'cancel' },
              { text: 'Hapus', onPress: () => deleteReminder(item.id), style: 'destructive' },
            ]
          )
        }
        onPress={() => navigation.navigate('ReminderDetail', { reminderId: item.id })}
      >
        <Ionicons name={item.icon || 'notifications-outline'} size={24} color={COLORS.primaryDark} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{formattedDate}, pukul {formattedTime}</Text>
          {item.notes ? <Text style={styles.notes}>Catatan: {item.notes}</Text> : null}
        </View>
        <Ionicons name="chevron-forward-outline" size={22} color={COLORS.textSecondary} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {reminders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="archive-outline" size={60} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>Belum ada pengingat.</Text>
          <Text style={styles.emptySubText}>Tekan tombol '+' di pojok kanan atas untuk menambah.</Text>
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  notes: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  }
});

export default ReminderScreen;
