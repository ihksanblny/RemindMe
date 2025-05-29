import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createReminder } from '../services/ReminderServices';
import { ReminderContext } from '../context/ReminderContext';
import COLORS from '../constant/colors';

// Notifee untuk local notification
import notifee, {
  AndroidImportance,
  TriggerType,
} from '@notifee/react-native';

const AddReminderScreen = ({ navigation }) => {
  const { setReminders } = useContext(ReminderContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const scheduleNotification = async (reminder) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'reminder',
      name: 'Reminder Notifications',
      importance: AndroidImportance.HIGH,
    });

    const reminderTime = new Date(reminder.date).getTime();

    await notifee.createTriggerNotification(
      {
        title: 'Pengingat: ' + reminder.title,
        body: reminder.notes || 'Jangan lupa aktivitas kesehatanmu!',
        android: {
          channelId,
          pressAction: { id: 'default' },
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: reminderTime,
      }
    );
  };

  const handleSaveReminder = async () => {
    if (!title.trim()) {
      Alert.alert('Input Tidak Valid', 'Judul pengingat tidak boleh kosong!');
      return;
    }

    const reminderDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );

    if (reminderDateTime <= new Date()) {
      Alert.alert('Waktu tidak valid', 'Waktu pengingat harus di masa depan.');
      return;
    }

    const newReminder = {
      title: title.trim(),
      date: reminderDateTime.toISOString(),
      notes: notes.trim(),
      icon: 'notifications-outline',
    };

    try {
      await createReminder(newReminder);
      await scheduleNotification(newReminder);
      Alert.alert('Sukses', 'Pengingat berhasil disimpan dan dijadwalkan!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal', 'Gagal menyimpan pengingat.');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Judul Pengingat:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Cth: Minum Obat Pagi"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text style={styles.label}>Tanggal:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateDisplay}>
        <Text style={styles.dateText}>
          {date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Waktu:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateDisplay}>
        <Text style={styles.dateText}>
          {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeTime}
        />
      )}

      <Text style={styles.label}>Catatan (Opsional):</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Detail pengingat..."
        placeholderTextColor={COLORS.textSecondary}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Simpan Pengingat"
          onPress={handleSaveReminder}
          color={COLORS.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightGreenBackground || '#f0fdf4',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateDisplay: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddReminderScreen;
