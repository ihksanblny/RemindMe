import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddHabitScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [note, setNote] = useState('');

  const addHabitTracker = async () => {
    if (!name.trim() || !frequency.trim()) {
      Alert.alert('Error', 'Nama dan frekuensi harus diisi!');
      return;
    }

    try {
      await firestore().collection('habits').add({
        name,
        frequency,
        note,
        status: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setName('');
      setFrequency('');
      setNote('');
      Alert.alert('Sukses', 'Habit ditambahkan!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Gagal', 'Tidak dapat menambah habit.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Kebiasaan</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama kebiasaan"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Frekuensi (harian/mingguan)"
        value={frequency}
        onChangeText={setFrequency}
      />
      <TextInput
        style={styles.input}
        placeholder="Catatan (opsional)"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Simpan" onPress={addHabitTracker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
});

export default AddHabitScreen;
