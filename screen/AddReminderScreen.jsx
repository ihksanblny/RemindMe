// screen/AddReminderScreen.jsx
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
  TouchableOpacity // Ditambahkan untuk DateTimePicker
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker diaktifkan
import { ReminderContext } from '../context/ReminderContext';
import COLORS from '../constant/colors'; 

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

  const handleSaveReminder = () => {
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

    const newReminder = {
      id: Date.now().toString(),
      title: title.trim(),
      date: reminderDateTime.toISOString(),
      notes: notes.trim(),
      icon: 'notifications-outline', 
    };
    
    setReminders(prevReminders => [...prevReminders, newReminder]);
    
    Alert.alert('Sukses', 'Pengingat berhasil disimpan!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Judul Pengingat:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Cth: Minum Obat Pagi"
        placeholderTextColor={COLORS.textSecondary || '#6b7280'}
      />

      <Text style={styles.label}>Tanggal:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateDisplay}>
        <Text style={styles.dateText}>{date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}
      
      <Text style={styles.label}>Waktu:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateDisplay}>
        <Text style={styles.dateText}>{time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
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
        placeholderTextColor={COLORS.textSecondary || '#6b7280'}
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
    color: COLORS.primaryDark || '#065f46',
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.white || '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border || '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.text || '#1f2937',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateDisplay: {
    backgroundColor: COLORS.white || '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border || '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text || '#1f2937',
  },
  buttonContainer: {
    marginTop: 20,
  }
});

export default AddReminderScreen;