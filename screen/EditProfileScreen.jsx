// screen/EditProfileScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import COLORS from '../constant/colors';

const EditProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age.toString());
  const [weight, setWeight] = useState(user.weight.toString());
  const [height, setHeight] = useState(user.height.toString());

  const handleSaveChanges = () => {
    Alert.alert('Sukses', 'Perubahan berhasil disimpan!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Nama Lengkap:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Umur:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text style={styles.label}>Berat Badan (kg):</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <Text style={styles.label}>Tinggi Badan (cm):</Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
      <View style={styles.buttonContainer}>
        <Button title="Simpan Perubahan" onPress={handleSaveChanges} color={COLORS.primary} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.primaryDark, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.text,
  },
  buttonContainer: { marginTop: 20 },
});

export default EditProfileScreen;