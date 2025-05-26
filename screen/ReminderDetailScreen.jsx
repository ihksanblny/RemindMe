import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import COLORS from '../constant/colors';
import {
  getReminderById,
  deleteReminder,
} from '../services/ReminderServices';

const ReminderDetailScreen = ({ route, navigation }) => {
  const { reminderId } = route.params;
  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReminder = async () => {
    try {
      const data = await getReminderById(reminderId);
      setReminder(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal mengambil data pengingat.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReminder = () => {
    Alert.alert('Hapus Pengingat', 'Yakin ingin menghapus?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteReminder(reminderId);
            Alert.alert('Berhasil', 'Pengingat dihapus');
            navigation.goBack();
          } catch (error) {
            Alert.alert('Gagal', 'Tidak bisa menghapus pengingat.');
          }
        },
      },
    ]);
  };

  useFocusEffect(
  useCallback(() => {
    fetchReminder();
  }, [reminderId])
);

  if (loading) return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loading} />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons
            name={reminder.icon || 'notifications-outline'}
            size={40}
            color={COLORS.primary}
            style={{ marginRight: 12 }}
          />
          <Text style={styles.title}>{reminder.title}</Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.accentIndigo} />
          <Text style={styles.date}>
            {new Date(reminder.date).toLocaleString('id-ID')}
          </Text>
        </View>

        {reminder.notes ? (
          <View style={styles.section}>
            <Ionicons name="document-text-outline" size={20} color={COLORS.accentIndigo} />
            <Text style={styles.notes}>{reminder.notes}</Text>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.accentIndigo }]}
            onPress={() => navigation.navigate('EditReminder', { reminder })}
          >
            <Ionicons name="pencil-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.red }]}
            onPress={handleDeleteReminder}
          >
            <Ionicons name="trash-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    flexShrink: 1,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  notes: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.textSecondary,
    flexShrink: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ReminderDetailScreen;
