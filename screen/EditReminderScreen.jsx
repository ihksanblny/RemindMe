// screen/EditReminderScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import COLORS from '../constant/colors';
import {
  updateReminder,
} from '../services/ReminderServices';

const EditReminderScreen = ({ route, navigation }) => {
  const { reminder } = route.params;

  const [title, setTitle] = useState(reminder.title || '');
  const [date, setDate] = useState(reminder.date || '');
  const [notes, setNotes] = useState(reminder.notes || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
  if (!title.trim()) {
    Alert.alert('Error', 'Judul tidak boleh kosong');
    return;
  }
  setLoading(true);
  try {
    console.log('Update reminder id:', reminder.id);
    console.log('Payload update:', { title, date, notes });
    await updateReminder(reminder.id, { title, date, notes, icon: reminder.icon });
    Alert.alert('Berhasil', 'Pengingat berhasil diperbarui');
    navigation.goBack();
  } catch (error) {
    Alert.alert('Gagal', 'Gagal memperbarui pengingat');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading) return <ActivityIndicator size="large" color={COLORS.primary} style={{flex:1, justifyContent:'center'}} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan judul pengingat"
      />

      <Text style={styles.label}>Tanggal & Waktu (ISO Format)</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Contoh: 2025-05-26T15:00:00"
      />

      <Text style={styles.label}>Catatan</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Tambahkan catatan (opsional)"
        multiline
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Simpan" onPress={handleSave} color={COLORS.accentIndigo} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text,
  },
});

export default EditReminderScreen;
